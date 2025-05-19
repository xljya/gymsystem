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
import com.liucf.gymsystembackend.model.dto.goodstransactions.GoodsTransactionsAddRequest;
import com.liucf.gymsystembackend.model.dto.goodstransactions.GoodsTransactionsQueryRequest;
import com.liucf.gymsystembackend.model.dto.goodstransactions.GoodsTransactionsUpdateRequest;
import com.liucf.gymsystembackend.model.entity.GoodsTransactions;
import com.liucf.gymsystembackend.model.vo.GoodsTransactionsVO;
import com.liucf.gymsystembackend.service.GoodsTransactionsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 商品销售记录接口
 */
@RestController
@RequestMapping("/goodsTransactions")
@Slf4j
public class GoodsTransactionsController {

    @Resource
    private GoodsTransactionsService goodsTransactionsService;

    /**
     * 创建商品销售记录
     */
    @PostMapping("/add")
    public BaseResponse<Long> addGoodsTransactions(@RequestBody GoodsTransactionsAddRequest goodsTransactionsAddRequest) {
        if (goodsTransactionsAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long result = goodsTransactionsService.addGoodsTransactions(goodsTransactionsAddRequest);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取商品销售记录（仅管理员）
     */
    @GetMapping("/get")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<GoodsTransactions> getGoodsTransactionsById(long id) {
        ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);
        GoodsTransactions goodsTransactions = goodsTransactionsService.getById(id);
        ThrowUtils.throwIf(goodsTransactions == null, ErrorCode.NOT_FOUND_ERROR);
        return ResultUtils.success(goodsTransactions);
    }

    /**
     * 根据 id 获取脱敏的商品销售记录信息
     */
    @GetMapping("/get/vo")
    public BaseResponse<GoodsTransactionsVO> getGoodsTransactionsVOById(long id) {
        BaseResponse<GoodsTransactions> response = getGoodsTransactionsById(id);
        GoodsTransactions goodsTransactions = response.getData();
        return ResultUtils.success(goodsTransactionsService.getGoodsTransactionsVO(goodsTransactions));
    }

    /**
     * 删除商品销售记录（仅管理员）
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteGoodsTransactions(@RequestBody DeleteRequest deleteRequest) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean b = goodsTransactionsService.removeById(deleteRequest.getId());
        return ResultUtils.success(b);
    }

    /**
     * 更新商品销售记录
     */
    @PostMapping("/update")
    public BaseResponse<Boolean> updateGoodsTransactions(@RequestBody GoodsTransactionsUpdateRequest goodsTransactionsUpdateRequest) {
        if (goodsTransactionsUpdateRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = goodsTransactionsService.updateGoodsTransactions(goodsTransactionsUpdateRequest);
        return ResultUtils.success(result);
    }

    /**
     * 分页获取商品销售记录列表（仅管理员）
     */
    @PostMapping("/list/page/vo")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Page<GoodsTransactionsVO>> listGoodsTransactionsVOByPage(@RequestBody GoodsTransactionsQueryRequest goodsTransactionsQueryRequest) {
        ThrowUtils.throwIf(goodsTransactionsQueryRequest == null, ErrorCode.PARAMS_ERROR);
        long current = goodsTransactionsQueryRequest.getCurrent();
        long pageSize = goodsTransactionsQueryRequest.getPageSize();
        Page<GoodsTransactions> goodsTransactionsPage = goodsTransactionsService.page(new Page<>(current, pageSize),
                goodsTransactionsService.getQueryWrapper(goodsTransactionsQueryRequest));
        Page<GoodsTransactionsVO> goodsTransactionsVOPage = new Page<>(current, pageSize, goodsTransactionsPage.getTotal());
        List<GoodsTransactionsVO> goodsTransactionsVOList = goodsTransactionsService.getGoodsTransactionsVOList(goodsTransactionsPage.getRecords());
        goodsTransactionsVOPage.setRecords(goodsTransactionsVOList);
        return ResultUtils.success(goodsTransactionsVOPage);
    }
} 