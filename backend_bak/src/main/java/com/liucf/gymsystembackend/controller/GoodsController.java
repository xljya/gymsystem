package com.liucf.gymsystembackend.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.liucf.gymsystembackend.annotation.AuthCheck;
import com.liucf.gymsystembackend.common.BaseResponse;
import com.liucf.gymsystembackend.common.DeleteRequest;
import com.liucf.gymsystembackend.common.ResultUtils;
import com.liucf.gymsystembackend.constant.MemberConstant;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.exception.ThrowUtils;
import com.liucf.gymsystembackend.model.dto.goods.GoodsAddRequest;
import com.liucf.gymsystembackend.model.dto.goods.GoodsQueryRequest;
import com.liucf.gymsystembackend.model.dto.goods.GoodsUpdateRequest;
import com.liucf.gymsystembackend.model.entity.Goods;
import com.liucf.gymsystembackend.model.vo.GoodsVO;
import com.liucf.gymsystembackend.service.GoodsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 商品接口
 */
@RestController
@RequestMapping("/goods")
@Slf4j
public class GoodsController {

    @Resource
    private GoodsService goodsService;

    /**
     * 创建商品（仅管理员）
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Integer> addGoods(@RequestBody GoodsAddRequest goodsAddRequest) {
        ThrowUtils.throwIf(goodsAddRequest == null, ErrorCode.PARAMS_ERROR);
        Goods goods = new Goods();
        BeanUtils.copyProperties(goodsAddRequest, goods);
        boolean result = goodsService.addGoods(goods);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(goods.getGoodsId());
    }

    /**
     * 根据 id 获取商品（仅管理员）
     */
    @GetMapping("/get")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Goods> getGoodsById(long goodsId) {
        ThrowUtils.throwIf(goodsId <= 0, ErrorCode.PARAMS_ERROR);
        Goods goods = goodsService.getById(goodsId);
        ThrowUtils.throwIf(goods == null, ErrorCode.NOT_FOUND_ERROR);
        return ResultUtils.success(goods);
    }

    /**
     * 根据 id 获取脱敏的商品信息
     */
    @GetMapping("/get/vo")
    public BaseResponse<GoodsVO> getGoodsVOById(long goodsId) {
        BaseResponse<Goods> response = getGoodsById(goodsId);
        Goods goods = response.getData();
        return ResultUtils.success(goodsService.getGoodsVO(goods));
    }

    /**
     * 删除商品（仅管理员）
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteGoods(@RequestBody DeleteRequest deleteRequest) {
        if (deleteRequest == null || deleteRequest.getGoodsId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = goodsService.deleteGoods(deleteRequest.getGoodsId());
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "删除商品失败");
        }
        return ResultUtils.success(true);
    }

    /**
     * 更新商品（仅管理员）
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateGoods(@RequestBody GoodsUpdateRequest goodsUpdateRequest) {
        if (goodsUpdateRequest == null || goodsUpdateRequest.getGoodsId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Goods goods = new Goods();
        BeanUtils.copyProperties(goodsUpdateRequest, goods);
        boolean result = goodsService.updateGoods(goods);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 分页获取商品列表（仅管理员）
     */
    @PostMapping("/list/page/vo")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Page<GoodsVO>> listGoodsVOByPage(@RequestBody GoodsQueryRequest goodsQueryRequest) {
        ThrowUtils.throwIf(goodsQueryRequest == null, ErrorCode.PARAMS_ERROR);
        long current = goodsQueryRequest.getCurrent();
        long pageSize = goodsQueryRequest.getPageSize();
        Page<Goods> goodsPage = goodsService.page(new Page<>(current, pageSize),
                goodsService.getQueryWrapper(goodsQueryRequest));
        Page<GoodsVO> goodsVOPage = new Page<>(current, pageSize, goodsPage.getTotal());
        List<GoodsVO> goodsVOList = goodsService.getGoodsVOList(goodsPage.getRecords());
        goodsVOPage.setRecords(goodsVOList);
        return ResultUtils.success(goodsVOPage);
    }
} 