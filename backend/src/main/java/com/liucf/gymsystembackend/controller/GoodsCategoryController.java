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
import com.liucf.gymsystembackend.model.dto.goods.GoodsCategoryAddRequest;
import com.liucf.gymsystembackend.model.dto.goods.GoodsCategoryQueryRequest;
import com.liucf.gymsystembackend.model.dto.goods.GoodsCategoryUpdateRequest;
import com.liucf.gymsystembackend.model.vo.GoodsCategoryVO;
import com.liucf.gymsystembackend.service.GoodsCategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 商品分类接口
 */
@RestController
@RequestMapping("/goods/category")
@Slf4j
public class GoodsCategoryController {

    @Resource
    private GoodsCategoryService goodsCategoryService;

    /**
     * 新增商品分类
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE) // 假设只有管理员能添加
    public BaseResponse<Long> addGoodsCategory(@RequestBody GoodsCategoryAddRequest goodsCategoryAddRequest) {
        if (goodsCategoryAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long newGoodsCategoryId = goodsCategoryService.addGoodsCategory(goodsCategoryAddRequest);
        return ResultUtils.success(newGoodsCategoryId);
    }

    /**
     * 删除商品分类
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE) // 假设只有管理员能删除
    public BaseResponse<Boolean> deleteGoodsCategory(@RequestBody DeleteRequest deleteRequest) {
        if (deleteRequest == null || deleteRequest.getId() == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = goodsCategoryService.deleteGoodsCategory(deleteRequest.getId());
        return ResultUtils.success(result);
    }

    /**
     * 更新商品分类
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE) // 假设只有管理员能更新
    public BaseResponse<Boolean> updateGoodsCategory(@RequestBody GoodsCategoryUpdateRequest goodsCategoryUpdateRequest) {
        if (goodsCategoryUpdateRequest == null || goodsCategoryUpdateRequest.getGdcategoryId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = goodsCategoryService.updateGoodsCategory(goodsCategoryUpdateRequest);
        return ResultUtils.success(result);
    }

    /**
     * 根据id获取商品分类（VO）
     */
    @GetMapping("/get/vo")
    // @AuthCheck(mustRole = MemberConstant.MEMBER_ROLE) // 假设会员或管理员可查看
    public BaseResponse<GoodsCategoryVO> getGoodsCategoryVOById(long id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        GoodsCategoryVO goodsCategoryVO = goodsCategoryService.getGoodsCategoryVOById(id);
        ThrowUtils.throwIf(goodsCategoryVO == null, ErrorCode.NOT_FOUND_ERROR, "商品分类不存在");
        return ResultUtils.success(goodsCategoryVO);
    }

    /**
     * 分页获取商品分类（VO）
     */
    @PostMapping("/list/page/vo")
    // @AuthCheck(mustRole = MemberConstant.MEMBER_ROLE) // 假设会员或管理员可查看
    public BaseResponse<IPage<GoodsCategoryVO>> listGoodsCategoryVOByPage(@RequestBody GoodsCategoryQueryRequest goodsCategoryQueryRequest) {
        if (goodsCategoryQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        IPage<GoodsCategoryVO> goodsCategoryVOPage = goodsCategoryService.getGoodsCategoryVOPage(goodsCategoryQueryRequest);
        return ResultUtils.success(goodsCategoryVOPage);
    }
    
    // 未来可以根据需求添加获取全部分类列表的接口，例如用于下拉框
    // @GetMapping("/list/all")
    // public BaseResponse<List<GoodsCategoryVO>> listAllGoodsCategories() {
    //     List<GoodsCategory> list = goodsCategoryService.list(goodsCategoryService.getQueryWrapper(new GoodsCategoryQueryRequest())); // 这里需要一个空的QueryRequest或特定方法
    //     List<GoodsCategoryVO> voList = goodsCategoryService.getGoodsCategoryVOList(list);
    //     return ResultUtils.success(voList);
    // }
} 