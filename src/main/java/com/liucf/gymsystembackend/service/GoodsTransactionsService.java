package com.liucf.gymsystembackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.liucf.gymsystembackend.model.dto.goodstransactions.GoodsTransactionsAddRequest;
import com.liucf.gymsystembackend.model.dto.goodstransactions.GoodsTransactionsQueryRequest;
import com.liucf.gymsystembackend.model.dto.goodstransactions.GoodsTransactionsUpdateRequest;
import com.liucf.gymsystembackend.model.entity.GoodsTransactions;
import com.liucf.gymsystembackend.model.vo.GoodsTransactionsVO;

import java.util.List;

/**
 * 商品销售记录服务
 */
public interface GoodsTransactionsService extends IService<GoodsTransactions> {

    /**
     * 获取脱敏的商品销售记录信息
     *
     * @param goodsTransactions 商品销售记录信息
     * @return 脱敏后的商品销售记录信息
     */
    GoodsTransactionsVO getGoodsTransactionsVO(GoodsTransactions goodsTransactions);

    /**
     * 获取脱敏的商品销售记录信息列表
     *
     * @param goodsTransactionsList 商品销售记录信息列表
     * @return 脱敏后的商品销售记录信息列表
     */
    List<GoodsTransactionsVO> getGoodsTransactionsVOList(List<GoodsTransactions> goodsTransactionsList);

    /**
     * 获取查询包装器
     *
     * @param goodsTransactionsQueryRequest 商品销售记录查询请求
     * @return 查询包装器
     */
    QueryWrapper<GoodsTransactions> getQueryWrapper(GoodsTransactionsQueryRequest goodsTransactionsQueryRequest);

    /**
     * 新增商品销售记录
     *
     * @param goodsTransactionsAddRequest 商品销售记录新增请求
     * @return 新增的商品销售记录ID
     */
    Long addGoodsTransactions(GoodsTransactionsAddRequest goodsTransactionsAddRequest);

    /**
     * 更新商品销售记录
     *
     * @param goodsTransactionsUpdateRequest 商品销售记录更新请求
     * @return 是否更新成功
     */
    boolean updateGoodsTransactions(GoodsTransactionsUpdateRequest goodsTransactionsUpdateRequest);
}
