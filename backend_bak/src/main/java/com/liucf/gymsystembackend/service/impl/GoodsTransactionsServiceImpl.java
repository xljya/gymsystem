package com.liucf.gymsystembackend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.mapper.GoodsTransactionsMapper;
import com.liucf.gymsystembackend.model.dto.goodstransactions.GoodsTransactionsAddRequest;
import com.liucf.gymsystembackend.model.dto.goodstransactions.GoodsTransactionsQueryRequest;
import com.liucf.gymsystembackend.model.dto.goodstransactions.GoodsTransactionsUpdateRequest;
import com.liucf.gymsystembackend.model.entity.Goods;
import com.liucf.gymsystembackend.model.entity.GoodsTransactions;
import com.liucf.gymsystembackend.model.entity.Members;
import com.liucf.gymsystembackend.model.vo.GoodsTransactionsVO;
import com.liucf.gymsystembackend.service.GoodsService;
import com.liucf.gymsystembackend.service.GoodsTransactionsService;
import com.liucf.gymsystembackend.service.MembersService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 商品销售记录服务实现
 */
@Service
public class GoodsTransactionsServiceImpl extends ServiceImpl<GoodsTransactionsMapper, GoodsTransactions>
        implements GoodsTransactionsService {

    @Resource
    private GoodsService goodsService;

    @Resource
    private MembersService membersService;

    @Override
    public GoodsTransactionsVO getGoodsTransactionsVO(GoodsTransactions goodsTransactions) {
        if (goodsTransactions == null) {
            return null;
        }
        GoodsTransactionsVO goodsTransactionsVO = new GoodsTransactionsVO();
        BeanUtils.copyProperties(goodsTransactions, goodsTransactionsVO);
        return goodsTransactionsVO;
    }

    @Override
    public List<GoodsTransactionsVO> getGoodsTransactionsVOList(List<GoodsTransactions> goodsTransactionsList) {
        if (goodsTransactionsList == null || goodsTransactionsList.isEmpty()) {
            return new ArrayList<>();
        }
        return goodsTransactionsList.stream().map(this::getGoodsTransactionsVO).collect(Collectors.toList());
    }

    @Override
    public QueryWrapper<GoodsTransactions> getQueryWrapper(GoodsTransactionsQueryRequest goodsTransactionsQueryRequest) {
        if (goodsTransactionsQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        Long id = goodsTransactionsQueryRequest.getId();
        Long goodsId = goodsTransactionsQueryRequest.getGoodsId();
        Long memberId = goodsTransactionsQueryRequest.getMemberId();
        Integer countMin = goodsTransactionsQueryRequest.getCountMin();
        Integer countMax = goodsTransactionsQueryRequest.getCountMax();
        BigDecimal priceMin = goodsTransactionsQueryRequest.getPriceMin();
        BigDecimal priceMax = goodsTransactionsQueryRequest.getPriceMax();
        Date createTimeStart = goodsTransactionsQueryRequest.getCreateTimeStart();
        Date createTimeEnd = goodsTransactionsQueryRequest.getCreateTimeEnd();

        QueryWrapper<GoodsTransactions> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(id != null, "id", id);
        queryWrapper.eq(goodsId != null, "goods_id", goodsId);
        queryWrapper.eq(memberId != null, "member_id", memberId);
        queryWrapper.ge(countMin != null, "count", countMin);
        queryWrapper.le(countMax != null, "count", countMax);
        queryWrapper.ge(priceMin != null, "price", priceMin);
        queryWrapper.le(priceMax != null, "price", priceMax);
        queryWrapper.ge(createTimeStart != null, "create_time", createTimeStart);
        queryWrapper.le(createTimeEnd != null, "create_time", createTimeEnd);
        queryWrapper.eq("is_delete", 0);
        return queryWrapper;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long addGoodsTransactions(GoodsTransactionsAddRequest goodsTransactionsAddRequest) {
        if (goodsTransactionsAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        
        // 校验参数
        Long goodsId = goodsTransactionsAddRequest.getGoodsId();
        Long memberId = goodsTransactionsAddRequest.getMemberId();
        Integer count = goodsTransactionsAddRequest.getCount();
        BigDecimal price = goodsTransactionsAddRequest.getPrice();
        
        if (goodsId == null || goodsId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "商品ID不能为空");
        }
        if (memberId == null || memberId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "会员ID不能为空");
        }
        if (count == null || count <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "购买数量必须大于0");
        }
        if (price == null || price.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "成交单价必须大于0");
        }
        
        // 检查商品是否存在且未删除
        Goods goods = goodsService.getById(goodsId);
        if (goods == null || goods.getIsDelete() == 1) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "商品不存在或已删除");
        }
        
        // 检查会员是否存在且未删除
        Members member = membersService.getById(memberId);
        if (member == null || member.getIsDelete() == 1) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "会员不存在或已删除");
        }
        
        // 检查库存是否充足
        if (goods.getInventory() < count) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "商品库存不足，当前库存：" + goods.getInventory());
        }
        
        // 创建销售记录
        GoodsTransactions goodsTransactions = new GoodsTransactions();
        goodsTransactions.setGoodsId(goodsId);
        goodsTransactions.setMemberId(memberId);
        goodsTransactions.setCount(count);
        goodsTransactions.setPrice(price);
        goodsTransactions.setIsDelete(0);
        
        boolean saveResult = this.save(goodsTransactions);
        if (!saveResult) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "创建销售记录失败");
        }
        
        // 更新商品库存
        int newInventory = goods.getInventory() - count;
        if (newInventory < 0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "库存计算错误，请重试");
        }
        goods.setInventory(newInventory);
        boolean updateResult = goodsService.updateById(goods);
        if (!updateResult) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "更新商品库存失败");
        }
        
        return goodsTransactions.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean updateGoodsTransactions(GoodsTransactionsUpdateRequest goodsTransactionsUpdateRequest) {
        if (goodsTransactionsUpdateRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        
        Long id = goodsTransactionsUpdateRequest.getId();
        if (id == null || id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "记录ID不能为空");
        }
        
        // 检查记录是否存在
        GoodsTransactions oldGoodsTransactions = this.getById(id);
        if (oldGoodsTransactions == null || oldGoodsTransactions.getIsDelete() == 1) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "销售记录不存在或已删除");
        }
        
        // 如果修改了商品ID，检查新商品是否存在
        Long goodsId = goodsTransactionsUpdateRequest.getGoodsId();
        if (goodsId != null && !goodsId.equals(oldGoodsTransactions.getGoodsId())) {
            Goods goods = goodsService.getById(goodsId);
            if (goods == null || goods.getIsDelete() == 1) {
                throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "商品不存在或已删除");
            }
        }
        
        // 如果修改了会员ID，检查新会员是否存在
        Long memberId = goodsTransactionsUpdateRequest.getMemberId();
        if (memberId != null && !memberId.equals(oldGoodsTransactions.getMemberId())) {
            Members member = membersService.getById(memberId);
            if (member == null || member.getIsDelete() == 1) {
                throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "会员不存在或已删除");
            }
        }
        
        // 如果修改了数量，检查库存是否充足
        Integer count = goodsTransactionsUpdateRequest.getCount();
        if (count != null && !count.equals(oldGoodsTransactions.getCount())) {
            Goods goods = goodsService.getById(oldGoodsTransactions.getGoodsId());
            int inventoryChange = count - oldGoodsTransactions.getCount();
            int newInventory = goods.getInventory() - inventoryChange;
            if (newInventory < 0) {
                throw new BusinessException(ErrorCode.OPERATION_ERROR, 
                    "商品库存不足，当前库存：" + goods.getInventory() + 
                    "，需要减少：" + Math.abs(inventoryChange));
            }
            // 更新商品库存
            goods.setInventory(newInventory);
            boolean updateResult = goodsService.updateById(goods);
            if (!updateResult) {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR, "更新商品库存失败");
            }
        }
        
        // 更新销售记录
        GoodsTransactions goodsTransactions = new GoodsTransactions();
        BeanUtils.copyProperties(goodsTransactionsUpdateRequest, goodsTransactions);
        return this.updateById(goodsTransactions);
    }
}




