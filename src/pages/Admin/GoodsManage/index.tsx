import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown, ModalForm, ProFormText, ProFormDigit } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { message } from 'antd';
import {
  deleteGoodsUsingPost,
  addGoodsUsingPost,
  listGoodsVoByPageUsingPost,
  updateGoodsUsingPost,
} from '@/api/goodsController';

const columns: ProColumns<API.GoodsVO>[] = [
  {
    dataIndex: 'goodsId',
    valueType: 'index',
    width: 48,
    title: '序号',
    hideInSearch: true,
    editable: false,
    render: (_, __, index) => index + 1,
  },
  {
    title: '商品名称',
    dataIndex: 'goodsName',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入商品名称',
        },
      ],
    },
  },
  {
    title: '单位',
    dataIndex: 'unit',
    hideInSearch: false,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入单位',
        },
      ],
    },
  },
  // {
  //   title: '单价',
  //   dataIndex: 'unitPrice',
  //   valueType: 'money',
  //   hideInSearch: true,
  //   formItemProps: {
  //     rules: [
  //       {
  //         required: true,
  //         message: '请输入单价',
  //       },
  //       {
  //         type: 'number',
  //         min: 0,
  //         message: '单价不能小于0',
  //       },
  //     ],
  //   },
  // },
  {
    title: '售价',
    dataIndex: 'sellPrice',
    valueType: 'money',
    hideInSearch: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入售价',
        },
        {
          type: 'number',
          min: 0,
          message: '售价不能小于0',
        },
      ],
    },
  },
  {
    title: '库存',
    dataIndex: 'inventory',
    hideInSearch: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入库存',
        },
        {
          pattern: /^[1-9]\d*$/,
          message: '请输入大于0的整数',
        },
      ],
    },
  },
  {
    title: '备注',
    dataIndex: 'goodAvatar',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
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
          if (record.goodsId) {
            action?.startEditable?.(record.goodsId);
          }
        }}
      >
        编辑
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={async (key) => {
          if (key === 'delete' && record.goodsId) {
            try {
              const res = await deleteGoodsUsingPost({ goodsId: record.goodsId });
              console.log('删除商品响应:', res);
              if (res) {
                message.success('删除成功');
                action?.reload();
              } else {
                message.error('删除失败');
              }
            } catch (error) {
              console.error('删除商品失败:', error);
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

  const handleAdd = async (fields: API.GoodsAddRequest) => {
    try {
      const res = await addGoodsUsingPost(fields);
      console.log('添加商品响应:', res);
      if (res) {
        message.success('添加成功');
        setCreateModalVisible(false);
        actionRef.current?.reload();
      } else {
        message.error('添加失败');
      }
    } catch (error) {
      console.error('添加商品失败:', error);
      message.error('添加失败，请重试');
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: '120px', marginBottom: '60px' }}>
      <ProTable<API.GoodsVO>
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
            新增商品
          </a>,
        ]}
        request={async (params) => {
          console.log('请求参数:', params);
          try {
            const res = await listGoodsVoByPageUsingPost({
              current: params.current,
              pageSize: params.pageSize,
              goodsName: params.goodsName,
              unit: params.unit,
            }) as API.IPageGoodsVO_;
            console.log('响应数据:', res);
            return {
              data: res.records || [],
              success: true,
              total: Number(res.total) || 0,
            };
          } catch (error) {
            console.error('获取商品列表失败:', error);
            message.error('获取商品列表失败');
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
              const res = await updateGoodsUsingPost({
                goodsId: record.goodsId,
                goodsName: record.goodsName,
                unit: record.unit,
                sellPrice: record.sellPrice,
                inventory: record.inventory,
                goodAvatar: record.goodAvatar,
              });
              console.log('更新商品响应:', res);
              if (res) {
                message.success('更新成功');
                actionRef.current?.reload();
              } else {
                message.error('更新失败');
              }
            } catch (error) {
              console.error('更新商品失败:', error);
              message.error('更新失败，请重试');
            }
          },
        }}
        columnsState={{
          persistenceKey: 'goods-manage-table',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
        }}
        rowKey="goodsId"
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
        title="新增商品"
        width="400px"
        open={createModalVisible}
        onOpenChange={setCreateModalVisible}
        onFinish={async (values) => {
          await handleAdd(values as API.GoodsAddRequest);
        }}
      >
        <ProFormText
          name="goodsName"
          label="商品名称"
          rules={[
            {
              required: true,
              message: '请输入商品名称',
            },
          ]}
        />
        <ProFormText
          name="unit"
          label="单位"
          rules={[
            {
              required: true,
              message: '请输入单位',
            },
          ]}
        />
        <ProFormDigit
          name="unitPrice"
          label="单价"
          min={0}
          rules={[
            {
              required: true,
              message: '请输入单价',
            },
          ]}
        />
        <ProFormDigit
          name="sellPrice"
          label="售价"
          min={0}
          rules={[
            {
              required: true,
              message: '请输入售价',
            },
          ]}
        />
        <ProFormDigit
          name="inventory"
          label="库存"
          min={0}
          rules={[
            {
              required: true,
              message: '请输入库存',
            },
          ]}
        />
        <ProFormText
          name="goodAvatar"
          label="备注"
        />
      </ModalForm>
    </div>
  );
}; 