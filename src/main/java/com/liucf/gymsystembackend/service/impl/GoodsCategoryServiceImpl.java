package com.liucf.gymsystembackend.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.mapper.GoodsCategoryMapper;
import com.liucf.gymsystembackend.mapper.GoodsMapper; // 假设存在 GoodsMapper，用于检查是否有商品使用该分类
import com.liucf.gymsystembackend.model.dto.goods.GoodsCategoryAddRequest;
import com.liucf.gymsystembackend.model.dto.goods.GoodsCategoryQueryRequest;
import com.liucf.gymsystembackend.model.dto.goods.GoodsCategoryUpdateRequest;
import com.liucf.gymsystembackend.model.entity.GoodsCategory;
import com.liucf.gymsystembackend.model.entity.Goods; // 假设存在 Goods 实体
import com.liucf.gymsystembackend.model.vo.GoodsCategoryVO;
import com.liucf.gymsystembackend.service.GoodsCategoryService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.apache.commons.lang3.StringUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 商品分类服务实现
 */
@Service
public class GoodsCategoryServiceImpl extends ServiceImpl<GoodsCategoryMapper, GoodsCategory>
        implements GoodsCategoryService {

    @Resource
    private GoodsMapper goodsMapper; // 注入GoodsMapper

    @Override
    public void validGoodsCategory(GoodsCategory goodsCategory, boolean add) {
        if (goodsCategory == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String categoryName = goodsCategory.getCategoryName();
        // 创建时，所有参数必须非空
        if (add) {
            if (StringUtils.isAnyBlank(categoryName)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "分类名称不能为空");
            }
        }
        // 更新时，至少一个参数非空
        if (!add && StringUtils.isBlank(categoryName) && StringUtils.isBlank(goodsCategory.getCategoryDescription()) && StringUtils.isBlank(goodsCategory.getCategoryIcon()) && StringUtils.isBlank(goodsCategory.getCategoryImage())) {
             throw new BusinessException(ErrorCode.PARAMS_ERROR, "更新参数不能都为空");
        }

        // 校验分类名称是否已存在 (仅在名称非空时校验)
        if (StringUtils.isNotBlank(categoryName)) {
            QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("category_name", categoryName);
            // 如果是更新操作，需要排除自身
            if (!add && goodsCategory.getGdcategoryId() != null) {
                queryWrapper.ne("gdcategory_id", goodsCategory.getGdcategoryId());
            }
            long count = this.count(queryWrapper);
            if (count > 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "商品分类名称已存在");
            }
        }
    }

    @Override
    @Transactional
    public long addGoodsCategory(GoodsCategoryAddRequest goodsCategoryAddRequest) {
        if (goodsCategoryAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        GoodsCategory goodsCategory = new GoodsCategory();
        BeanUtils.copyProperties(goodsCategoryAddRequest, goodsCategory);
        validGoodsCategory(goodsCategory, true);
        boolean saveResult = this.save(goodsCategory);
        if (!saveResult) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "添加商品分类失败");
        }
        return goodsCategory.getGdcategoryId();
    }

    @Override
    @Transactional
    public boolean deleteGoodsCategory(long id) {
        GoodsCategory goodsCategory = this.getById(id);
        if (goodsCategory == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "商品分类不存在");
        }
        // 检查是否有商品使用该分类
        QueryWrapper<Goods> goodsQueryWrapper = new QueryWrapper<>();
        goodsQueryWrapper.eq("gdcategory_id", id);
        long goodsCount = goodsMapper.selectCount(goodsQueryWrapper); // 假设GoodsMapper有selectCount方法
        if (goodsCount > 0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "该分类下存在商品，无法删除");
        }
        return this.removeById(id);
    }

    @Override
    @Transactional
    public boolean updateGoodsCategory(GoodsCategoryUpdateRequest goodsCategoryUpdateRequest) {
        if (goodsCategoryUpdateRequest == null || goodsCategoryUpdateRequest.getGdcategoryId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        GoodsCategory goodsCategory = new GoodsCategory();
        BeanUtils.copyProperties(goodsCategoryUpdateRequest, goodsCategory);
        validGoodsCategory(goodsCategory, false);
        GoodsCategory oldGoodsCategory = this.getById(goodsCategoryUpdateRequest.getGdcategoryId());
        if (oldGoodsCategory == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "待更新的商品分类不存在");
        }
        return this.updateById(goodsCategory);
    }

    @Override
    public GoodsCategoryVO getGoodsCategoryVOById(long id) {
        GoodsCategory goodsCategory = this.getById(id);
        if (goodsCategory == null) {
            return null;
        }
        return getGoodsCategoryVO(goodsCategory);
    }

    @Override
    public List<GoodsCategoryVO> getGoodsCategoryVOList(List<GoodsCategory> goodsCategoryList) {
        if (goodsCategoryList == null || goodsCategoryList.isEmpty()) {
            return new ArrayList<>();
        }
        return goodsCategoryList.stream().map(this::getGoodsCategoryVO).collect(Collectors.toList());
    }

    @Override
    public IPage<GoodsCategoryVO> getGoodsCategoryVOPage(GoodsCategoryQueryRequest goodsCategoryQueryRequest) {
        long current = goodsCategoryQueryRequest.getCurrent();
        long size = goodsCategoryQueryRequest.getPageSize();
        // 限制爬虫
        if (size > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数错误: 单页数量过多");
        }
        Page<GoodsCategory> goodsCategoryPage = this.page(new Page<>(current, size),
                this.getQueryWrapper(goodsCategoryQueryRequest));
        
        Page<GoodsCategoryVO> goodsCategoryVoPage = new Page<>(current, size, goodsCategoryPage.getTotal());
        List<GoodsCategoryVO> goodsCategoryVOList = goodsCategoryPage.getRecords().stream()
                .map(this::getGoodsCategoryVO)
                .collect(Collectors.toList());
        goodsCategoryVoPage.setRecords(goodsCategoryVOList);
        return goodsCategoryVoPage;
    }

    @Override
    public QueryWrapper<GoodsCategory> getQueryWrapper(GoodsCategoryQueryRequest goodsCategoryQueryRequest) {
        if (goodsCategoryQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
        Integer gdcategoryId = goodsCategoryQueryRequest.getGdcategoryId();
        String categoryName = goodsCategoryQueryRequest.getCategoryName();

        queryWrapper.eq(gdcategoryId != null, "gdcategory_id", gdcategoryId);
        queryWrapper.like(StringUtils.isNotBlank(categoryName), "category_name", categoryName);
        // 默认查询未删除的
        // queryWrapper.eq("is_delete", 0); // GoodsCategory 实体中似乎没有is_delete字段，暂时注释
        return queryWrapper;
    }

    private GoodsCategoryVO getGoodsCategoryVO(GoodsCategory goodsCategory) {
        if (goodsCategory == null) {
            return null;
        }
        GoodsCategoryVO vo = new GoodsCategoryVO();
        BeanUtils.copyProperties(goodsCategory, vo);
        // 如果GoodsCategory实体中有创建时间和更新时间，这里会自动映射。
        // 如果VO中有特殊字段需要处理，在此处添加逻辑
        return vo;
    }
}




