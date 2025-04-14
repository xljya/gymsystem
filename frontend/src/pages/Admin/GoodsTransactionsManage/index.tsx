import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown, ModalForm, ProFormText, ProFormDigit } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { message } from 'antd';
import request from '@/utils/request';

const columns: ProColumns<API.GoodsTransactions>[] = [
  {
    dataIndex: 'id',
    valueType: 'index',
    width: 48,
    title: '序号',
    hideInSearch: true,
    editable: false,
    render: (_, __, index) => index + 1,
  },
  {
    title: '商品ID',
    dataIndex: 'goodsId',
    hideInSearch: false,
  },
  {
    title: '会员ID',
    dataIndex: 'memberId',
    hideInSearch: false,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          if (record.id) {
            action?.startEditable?.(record.id);
          }
        }}
      >
        编辑
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={async (key) => {
          if (key === 'delete' && record.id) {
            try {
              const res = await request('/api/goodsTransactions/delete', {
                method: 'POST',
                data: { id: record.id },
              });
              console.log('删除销售记录响应:', res);
              if (res) {
                message.success('删除成功');
                action?.reload();
              } else {
                message.error('删除失败');
              }
            } catch (error) {
              console.error('删除销售记录失败:', error);
              message.error('删除失败，请重试');
            }
          }
        }}
        menus={[
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const handleAdd = async (fields: API.GoodsTransactionsAddRequest) => {
    try {
      const res = await request('/api/goodsTransactions/add', {
        method: 'POST',
        data: fields,
      });
      console.log('添加销售记录响应:', res);
      if (res) {
        message.success('添加成功');
        setCreateModalVisible(false);
        actionRef.current?.reload();
      } else {
        message.error('添加失败');
      }
    } catch (error) {
      console.error('添加销售记录失败:', error);
      message.error('添加失败，请重试');
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: '120px', marginBottom: '60px' }}>
      <ProTable<API.GoodsTransactions>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        toolBarRender={() => [
          <a
            key="add"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            新增销售记录
          </a>,
        ]}
        request={async (params) => {
          console.log('请求参数:', params);
          try {
            const res = await request('/api/goodsTransactions/list/page/vo', {
              method: 'POST',
              data: {
                current: params.current,
                pageSize: params.pageSize,
                goodsId: params.goodsId,
                memberId: params.memberId,
                countMin: params.countMin,
                countMax: params.countMax,
                priceMin: params.priceMin,
                priceMax: params.priceMax,
                createTimeStart: params.createTimeStart,
                createTimeEnd: params.createTimeEnd,
                sortField: params.sortField,
                sortOrder: params.sortOrder,
              },
            });
            console.log('响应数据:', res);
            return {
              data: res.records || [],
              success: true,
              total: Number(res.total) || 0,
            };
          } catch (error) {
            console.error('获取销售记录列表失败:', error);
            message.error('获取销售记录列表失败');
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        editable={{
          type: 'single',
          onSave: async (key, record) => {
            try {
              const res = await request('/api/goodsTransactions/update', {
                method: 'POST',
                data: {
                  id: record.id,
                  goodsId: record.goodsId,
                  memberId: record.memberId,
                  count: record.count,
                  price: record.price,
                },
              });
              console.log('更新销售记录响应:', res);
              if (res) {
                message.success('更新成功');
                actionRef.current?.reload();
              } else {
                message.error('更新失败');
              }
            } catch (error) {
              console.error('更新销售记录失败:', error);
              message.error('更新失败，请重试');
            }
          },
        }}
        columnsState={{
          persistenceKey: 'goods-transactions-manage-table',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          span: 8,
          defaultCollapsed: false,
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
          density: true,
          fullScreen: true,
          reload: true,
        }}
        form={{
          syncToUrl: true,
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle=""
      />

      <ModalForm
        title="新增销售记录"
        width="400px"
        open={createModalVisible}
        onOpenChange={setCreateModalVisible}
        onFinish={async (values) => {
          const data = {
            ...values,
            goodsId: Number(values.goodsId),
            memberId: values.memberId,
            count: Number(values.count),
            price: Number(values.price),
          };
          await handleAdd(data as API.GoodsTransactionsAddRequest);
        }}
      >
        <ProFormText
          name="goodsId"
          label="商品ID"
          rules={[
            {
              required: true,
              message: '请输入商品ID',
            },
            {
              pattern: /^\d+$/,
              message: '请输入有效的数字ID',
            },
          ]}
        />
        <ProFormText
          name="memberId"
          label="会员ID"
          rules={[
            {
              required: true,
              message: '请输入会员ID',
            },
          ]}
        />
        <ProFormText
          name="count"
          label="购买数量"
          rules={[
            {
              required: true,
              message: '请输入购买数量',
            },
            {
              pattern: /^\d+$/,
              message: '请输入有效的数字',
            },
          ]}
        />
        <ProFormText
          name="price"
          label="单价"
          rules={[
            {
              required: true,
              message: '请输入单价',
            },
            {
              pattern: /^\d+(\.\d{1,2})?$/,
              message: '请输入有效的金额',
            },
          ]}
        />
      </ModalForm>
    </div>
  );
}; 