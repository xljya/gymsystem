package com.liucf.gymsystembackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.liucf.gymsystembackend.model.dto.goods.GoodsQueryRequest;
import com.liucf.gymsystembackend.model.entity.Goods;
import com.liucf.gymsystembackend.model.vo.GoodsVO;

import java.util.List;

/**
 * 商品服务
 */
public interface GoodsService extends IService<Goods> {

    /**
     * 获取脱敏的商品信息
     *
     * @param goods 商品信息
     * @return 脱敏后的商品信息
     */
    GoodsVO getGoodsVO(Goods goods);

    /**
     * 获取脱敏的商品信息列表
     *
     * @param goodsList 商品信息列表
     * @return 脱敏后的商品信息列表
     */
    List<GoodsVO> getGoodsVOList(List<Goods> goodsList);

    /**
     * 获取查询包装器
     *
     * @param goodsQueryRequest 商品查询请求
     * @return 查询包装器
     */
    QueryWrapper<Goods> getQueryWrapper(GoodsQueryRequest goodsQueryRequest);

    /**
     * 添加商品
     *
     * @param goods 商品信息
     * @return 是否添加成功
     */
    boolean addGoods(Goods goods);

    /**
     * 更新商品
     *
     * @param goods 商品信息
     * @return 是否更新成功
     */
    boolean updateGoods(Goods goods);

    /**
     * 删除商品
     *
     * @param goodsId 商品ID
     * @return 是否删除成功
     */
    boolean deleteGoods(Long goodsId);
}
