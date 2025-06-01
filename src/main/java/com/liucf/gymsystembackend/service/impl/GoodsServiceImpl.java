package com.liucf.gymsystembackend.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.mapper.GoodsCategoryMapper;
import com.liucf.gymsystembackend.mapper.GoodsMapper;
import com.liucf.gymsystembackend.model.dto.goods.GoodsAddRequest;
import com.liucf.gymsystembackend.model.dto.goods.GoodsQueryRequest;
import com.liucf.gymsystembackend.model.dto.goods.GoodsUpdateRequest;
import com.liucf.gymsystembackend.model.entity.Goods;
import com.liucf.gymsystembackend.model.entity.GoodsCategory;
import com.liucf.gymsystembackend.model.vo.GoodsVO;
import com.liucf.gymsystembackend.service.GoodsService;
import com.liucf.gymsystembackend.service.MembersService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 商品服务实现
 */
@Service
public class GoodsServiceImpl extends ServiceImpl<GoodsMapper, Goods>
        implements GoodsService {

    @Resource
    private MembersService membersService;

    @Resource
    private GoodsCategoryMapper goodsCategoryMapper;

    private static final int MAX_PAGE_SIZE = 50;

    @Override
    public void validGoods(Goods goods, boolean add) {
        if (goods == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        if (StringUtils.isAnyBlank(goods.getGoodsName(), goods.getUnit())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "商品名称和单位不能为空");
        }
        if (goods.getSellPrice() == null || goods.getSellPrice().doubleValue() < 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "销售单价不能为空且不能为负");
        }
        if (goods.getInventory() == null || goods.getInventory() < 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "库存不能为空且不能为负");
        }
        if (goods.getGdcategoryId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "商品分类ID不能为空");
        }
        GoodsCategory goodsCategory = goodsCategoryMapper.selectById(goods.getGdcategoryId());
        if (goodsCategory == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "指定的商品分类不存在");
        }

        if (StringUtils.isNotBlank(goods.getGoodsName())) {
            QueryWrapper<Goods> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("goods_name", goods.getGoodsName());
            queryWrapper.eq("is_delete", 0);
            if (!add && goods.getGoodsId() != null) {
                queryWrapper.ne("goods_id", goods.getGoodsId());
            }
            long count = this.count(queryWrapper);
            if (count > 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "商品名称已存在");
            }
        }
    }

    @Override
    @Transactional
    public Integer addGoods(GoodsAddRequest goodsAddRequest) {
        if (goodsAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Goods goods = new Goods();
        BeanUtils.copyProperties(goodsAddRequest, goods);
        goods.setGoodsId(null);
        validGoods(goods, true);
        goods.setIsDelete(0);
        boolean saveResult = this.save(goods);
        if (!saveResult) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "添加商品失败");
        }
        return goods.getGoodsId();
    }

    @Override
    @Transactional
    public boolean deleteGoods(Integer goodsId) {
        if (goodsId == null || goodsId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "商品ID无效");
        }
        Goods goods = this.getById(goodsId);
        if (goods == null || goods.getIsDelete() == 1) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "商品不存在或已被删除");
        }
        return this.removeById(goodsId);
    }

    @Override
    @Transactional
    public boolean updateGoods(GoodsUpdateRequest goodsUpdateRequest) {
        if (goodsUpdateRequest == null || goodsUpdateRequest.getGoodsId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Goods goods = new Goods();
        BeanUtils.copyProperties(goodsUpdateRequest, goods);

        Goods oldGoods = this.getById(goods.getGoodsId());
        if (oldGoods == null || oldGoods.getIsDelete() == 1) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "待更新的商品不存在或已被删除");
        }
        validGoods(goods, false);
        return this.updateById(goods);
    }

    @Override
    public GoodsVO getGoodsVOById(Integer goodsId, HttpServletRequest request) {
        if (goodsId == null || goodsId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "商品ID无效");
        }
        Goods goods = this.getById(goodsId);
        if (goods == null || goods.getIsDelete() == 1) {
            return null;
        }
        return getGoodsVO(goods);
    }

    @Override
    public List<GoodsVO> getGoodsVOList(List<Goods> goodsList) {
        if (goodsList == null || goodsList.isEmpty()) {
            return new ArrayList<>();
        }
        return goodsList.stream()
                .map(this::getGoodsVO)
                .collect(Collectors.toList());
    }

    @Override
    public IPage<GoodsVO> getGoodsVOPage(GoodsQueryRequest goodsQueryRequest, HttpServletRequest request) {
        long current = goodsQueryRequest.getCurrent();
        long size = goodsQueryRequest.getPageSize();
        if (size > MAX_PAGE_SIZE) {
            size = MAX_PAGE_SIZE;
        }
        Page<Goods> goodsPage = this.page(new Page<>(current, size),
                this.getQueryWrapper(goodsQueryRequest));
        
        Page<GoodsVO> goodsVoPage = new Page<>(current, size, goodsPage.getTotal());
        List<GoodsVO> goodsVOList = goodsPage.getRecords().stream()
            .map(this::getGoodsVO)
            .collect(Collectors.toList());
        goodsVoPage.setRecords(goodsVOList);
        return goodsVoPage;
    }

    @Override
    public QueryWrapper<Goods> getQueryWrapper(GoodsQueryRequest goodsQueryRequest) {
        if (goodsQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        QueryWrapper<Goods> queryWrapper = new QueryWrapper<>();
        Integer goodsId = goodsQueryRequest.getGoodsId();
        String goodsName = goodsQueryRequest.getGoodsName();
        Integer gdcategoryId = goodsQueryRequest.getGdcategoryId();
        String unit = goodsQueryRequest.getUnit();
        Integer isDelete = goodsQueryRequest.getIsDelete();

        queryWrapper.eq(goodsId != null, "goods_id", goodsId);
        queryWrapper.like(StringUtils.isNotBlank(goodsName), "goods_name", goodsName);
        queryWrapper.eq(gdcategoryId != null, "gdcategory_id", gdcategoryId);
        queryWrapper.eq(StringUtils.isNotBlank(unit), "unit", unit);
        
        if (isDelete != null) {
            queryWrapper.eq("is_delete", isDelete);
        } else {
            queryWrapper.eq("is_delete", 0);
        }
        return queryWrapper;
    }

    @Override
    public GoodsVO getGoodsVO(Goods goods) {
        if (goods == null) {
            return null;
        }
        GoodsVO goodsVO = new GoodsVO();
        BeanUtils.copyProperties(goods, goodsVO);
        if (goods.getGdcategoryId() != null) {
            GoodsCategory goodsCategory = goodsCategoryMapper.selectById(goods.getGdcategoryId());
            if (goodsCategory != null) {
                goodsVO.setCategoryName(goodsCategory.getCategoryName());
            }
        }
        return goodsVO;
    }
}




