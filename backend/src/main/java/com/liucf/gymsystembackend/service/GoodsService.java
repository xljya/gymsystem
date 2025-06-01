package com.liucf.gymsystembackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.liucf.gymsystembackend.model.dto.goods.GoodsAddRequest;
import com.liucf.gymsystembackend.model.dto.goods.GoodsQueryRequest;
import com.liucf.gymsystembackend.model.dto.goods.GoodsUpdateRequest;
import com.liucf.gymsystembackend.model.entity.Goods;
import com.liucf.gymsystembackend.model.vo.GoodsVO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 商品服务
 */
public interface GoodsService extends IService<Goods> {

    /**
     * 校验商品信息
     *
     * @param goods 商品信息
     * @param add 是否为创建校验
     */
    void validGoods(Goods goods, boolean add);

    /**
     * 添加商品
     *
     * @param goodsAddRequest 商品添加请求
     * @return 新增商品的ID (Integer)
     */
    Integer addGoods(GoodsAddRequest goodsAddRequest);

    /**
     * 删除商品
     *
     * @param goodsId 商品ID (Integer)
     * @return 是否删除成功
     */
    boolean deleteGoods(Integer goodsId);

    /**
     * 更新商品
     *
     * @param goodsUpdateRequest 商品更新请求
     * @return 是否更新成功
     */
    boolean updateGoods(GoodsUpdateRequest goodsUpdateRequest);

    /**
     * 根据ID获取商品VO
     *
     * @param goodsId 商品ID (Integer)
     * @param request HTTP请求
     * @return 商品VO
     */
    GoodsVO getGoodsVOById(Integer goodsId, HttpServletRequest request);

    /**
     * 获取商品VO列表
     *
     * @param goodsList 商品实体列表
     * @return 商品VO列表
     */
    List<GoodsVO> getGoodsVOList(List<Goods> goodsList);

    /**
     * 分页获取商品VO
     *
     * @param goodsQueryRequest 商品查询请求
     * @param request HTTP请求
     * @return 分页商品VO
     */
    IPage<GoodsVO> getGoodsVOPage(GoodsQueryRequest goodsQueryRequest, HttpServletRequest request);

    /**
     * 获取查询包装器
     *
     * @param goodsQueryRequest 商品查询请求
     * @return 查询包装器
     */
    QueryWrapper<Goods> getQueryWrapper(GoodsQueryRequest goodsQueryRequest);

    /**
     * 将 Goods 实体转换为 GoodsVO
     * @param goods 商品实体
     * @return 商品VO
     */
    GoodsVO getGoodsVO(Goods goods);
}
