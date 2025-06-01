package com.liucf.gymsystembackend.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
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
import com.liucf.gymsystembackend.model.vo.GoodsVO;
import com.liucf.gymsystembackend.service.GoodsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

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
    public BaseResponse<Integer> addGoods(@RequestBody GoodsAddRequest goodsAddRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(goodsAddRequest == null, ErrorCode.PARAMS_ERROR);
        Integer newGoodsId = goodsService.addGoods(goodsAddRequest);
        return ResultUtils.success(newGoodsId);
    }

    /**
     * 根据 id 获取脱敏的商品信息
     */
    @GetMapping("/get/vo")
    public BaseResponse<GoodsVO> getGoodsVOById(@RequestParam Integer goodsId, HttpServletRequest request) {
        ThrowUtils.throwIf(goodsId == null || goodsId <= 0, ErrorCode.PARAMS_ERROR);
        GoodsVO goodsVO = goodsService.getGoodsVOById(goodsId, request);
        ThrowUtils.throwIf(goodsVO == null, ErrorCode.NOT_FOUND_ERROR, "商品不存在");
        return ResultUtils.success(goodsVO);
    }

    /**
     * 删除商品（仅管理员）
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteGoods(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(deleteRequest == null || deleteRequest.getId() == null || deleteRequest.getId() <= 0, ErrorCode.PARAMS_ERROR);
        boolean result = goodsService.deleteGoods(deleteRequest.getId().intValue());
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR, "删除商品失败");
        return ResultUtils.success(true);
    }

    /**
     * 更新商品（仅管理员）
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateGoods(@RequestBody GoodsUpdateRequest goodsUpdateRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(goodsUpdateRequest == null || goodsUpdateRequest.getGoodsId() == null, ErrorCode.PARAMS_ERROR);
        boolean result = goodsService.updateGoods(goodsUpdateRequest);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR, "更新商品失败");
        return ResultUtils.success(true);
    }

    /**
     * 分页获取商品列表VO (对所有登录用户开放)
     */
    @PostMapping("/list/page/vo")
    @AuthCheck(mustRole = MemberConstant.MEMBER_ROLE)
    public BaseResponse<IPage<GoodsVO>> listGoodsVOByPage(@RequestBody GoodsQueryRequest goodsQueryRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(goodsQueryRequest == null, ErrorCode.PARAMS_ERROR);
        IPage<GoodsVO> goodsVOPage = goodsService.getGoodsVOPage(goodsQueryRequest, request);
        return ResultUtils.success(goodsVOPage);
    }
} 