package com.liucf.gymsystembackend.service;

import com.liucf.gymsystembackend.model.entity.GoodsCategory;
import com.baomidou.mybatisplus.extension.service.IService;
import com.liucf.gymsystembackend.model.dto.goods.GoodsCategoryAddRequest;
import com.liucf.gymsystembackend.model.dto.goods.GoodsCategoryQueryRequest;
import com.liucf.gymsystembackend.model.dto.goods.GoodsCategoryUpdateRequest;
import com.liucf.gymsystembackend.model.vo.GoodsCategoryVO;
import com.baomidou.mybatisplus.core.metadata.IPage;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
* @author yueyue
* @description 针对表【goods_category(商品分类表)】的数据库操作Service
* @createDate 2025-05-30 01:37:47
*/
public interface GoodsCategoryService extends IService<GoodsCategory> {

    /**
     * 添加商品分类
     * @param goodsCategoryAddRequest 商品分类添加请求
     * @return 新增商品分类的ID
     */
    long addGoodsCategory(GoodsCategoryAddRequest goodsCategoryAddRequest);

    /**
     * 删除商品分类
     * @param id 商品分类ID
     * @return 是否删除成功
     */
    boolean deleteGoodsCategory(long id);

    /**
     * 更新商品分类
     * @param goodsCategoryUpdateRequest 商品分类更新请求
     * @return 是否更新成功
     */
    boolean updateGoodsCategory(GoodsCategoryUpdateRequest goodsCategoryUpdateRequest);

    /**
     * 根据ID获取商品分类封装
     * @param id 商品分类ID
     * @return 商品分类封装
     */
    GoodsCategoryVO getGoodsCategoryVOById(long id);

    /**
     * 获取商品分类封装列表
     * @param goodsCategoryList 商品分类列表
     * @return 商品分类封装列表
     */
    List<GoodsCategoryVO> getGoodsCategoryVOList(List<GoodsCategory> goodsCategoryList);

    /**
     * 分页获取商品分类封装
     * @param goodsCategoryQueryRequest 商品分类查询请求
     * @return 分页商品分类封装
     */
    IPage<GoodsCategoryVO> getGoodsCategoryVOPage(GoodsCategoryQueryRequest goodsCategoryQueryRequest);

    /**
     * 获取查询条件
     *
     * @param goodsCategoryQueryRequest
     * @return
     */
    com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<GoodsCategory> getQueryWrapper(GoodsCategoryQueryRequest goodsCategoryQueryRequest);


    /**
     * 校验商品分类信息
     *
     * @param goodsCategory 商品分类信息
     * @param add 是否为添加校验
     */
    void validGoodsCategory(GoodsCategory goodsCategory, boolean add);
}
