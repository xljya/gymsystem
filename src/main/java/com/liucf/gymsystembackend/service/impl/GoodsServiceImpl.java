package com.liucf.gymsystembackend.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.mapper.GoodsMapper;
import com.liucf.gymsystembackend.model.dto.goods.GoodsQueryRequest;
import com.liucf.gymsystembackend.model.entity.Goods;
import com.liucf.gymsystembackend.model.vo.GoodsVO;
import com.liucf.gymsystembackend.service.GoodsService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 商品服务实现
 */
@Service
public class GoodsServiceImpl extends ServiceImpl<GoodsMapper, Goods>
        implements GoodsService {

    @Override
    public GoodsVO getGoodsVO(Goods goods) {
        if (goods == null) {
            return null;
        }
        GoodsVO goodsVO = new GoodsVO();
        BeanUtils.copyProperties(goods, goodsVO);
        return goodsVO;
    }

    @Override
    public List<GoodsVO> getGoodsVOList(List<Goods> goodsList) {
        if (goodsList == null || goodsList.isEmpty()) {
            return new ArrayList<>();
        }
        return goodsList.stream().map(this::getGoodsVO).collect(Collectors.toList());
    }

    @Override
    public QueryWrapper<Goods> getQueryWrapper(GoodsQueryRequest goodsQueryRequest) {
        if (goodsQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        Long goodsId = goodsQueryRequest.getGoodsId();
        String goodsName = goodsQueryRequest.getGoodsName();
        String unit = goodsQueryRequest.getUnit();

        QueryWrapper<Goods> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(goodsId != null, "goods_id", goodsId);
        queryWrapper.like(StrUtil.isNotBlank(goodsName), "goods_name", goodsName);
        queryWrapper.eq(StrUtil.isNotBlank(unit), "unit", unit);
        queryWrapper.eq("is_delete", 0);
        return queryWrapper;
    }

    @Override
    public boolean addGoods(Goods goods) {
        if (goods == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        // 校验商品名称和单位
        if (StrUtil.hasBlank(goods.getGoodsName(), goods.getUnit())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "商品名称和单位不能为空");
        }
        // 检查商品名称是否重复
        QueryWrapper<Goods> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("goods_name", goods.getGoodsName());
        queryWrapper.eq("is_delete", 0);
        long count = this.count(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "商品名称重复");
        }
        // 设置默认状态
        goods.setIsDelete(0);
        return this.save(goods);
    }

    @Override
    public boolean updateGoods(Goods goods) {
        if (goods == null || goods.getGoodsId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        // 校验商品名称和单位
        if (StrUtil.hasBlank(goods.getGoodsName(), goods.getUnit())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "商品名称和单位不能为空");
        }
        // 检查商品是否存在
        Goods oldGoods = this.getById(goods.getGoodsId());
        if (oldGoods == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "商品不存在");
        }
        // 如果修改了商品名称，检查新名称是否重复
        if (!oldGoods.getGoodsName().equals(goods.getGoodsName())) {
            QueryWrapper<Goods> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("goods_name", goods.getGoodsName());
            queryWrapper.eq("is_delete", 0);
            queryWrapper.ne("goods_id", goods.getGoodsId());
            long count = this.count(queryWrapper);
            if (count > 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "商品名称重复");
            }
        }
        return this.updateById(goods);
    }

    @Override
    public boolean deleteGoods(Long goodsId) {
        if (goodsId == null || goodsId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "商品ID不能为空");
        }
        // 检查商品是否存在
        Goods goods = this.getById(goodsId);
        if (goods == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "商品不存在");
        }
        // 使用 MyBatis-Plus 的逻辑删除功能
        return this.removeById(goodsId);
    }
}




