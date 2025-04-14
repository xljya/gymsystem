import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown, ModalForm, ProFormText } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { message } from 'antd';
import { updateEquipmentUsingPost, deleteEquipmentUsingPost, addEquipmentUsingPost } from '@/api/equipmentController';
import request from '@/utils/request';

const columns: ProColumns<API.EquipmentVO>[] = [
  {
    dataIndex: 'eqId',
    valueType: 'index',
    width: 48,
    title: '序号',
    hideInSearch: true,
    editable: false,
    render: (_, __, index) => index + 1,
  },
  {
    title: '器材名称',
    dataIndex: 'eqName',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '器材描述',
    dataIndex: 'eqText',
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
          if (record.eqId) {
            action?.startEditable?.(record.eqId);
          }
        }}
      >
        编辑
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={(key) => {
          if (key === 'delete' && record.eqId) {
            deleteEquipmentUsingPost({ eqId: Number(record.eqId) }).then((res) => {
              console.log('删除响应:', res);
              if (res) {
                message.success('删除成功');
                action?.reload();
              } else {
                message.error('删除失败');
              }
            }).catch(error => {
              console.error('删除错误:', error);
              message.error('删除失败');
            });
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

  const handleAdd = async (fields: API.EquipmentAddRequest) => {
    try {
      const res = await addEquipmentUsingPost(fields);
      if (res) {
        message.success('添加成功');
        setCreateModalVisible(false);
        actionRef.current?.reload();
      } else {
        message.error('添加失败');
      }
    } catch (error) {
      console.error('添加错误:', error);
      message.error('添加失败');
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: '120px', marginBottom: '60px' }}>
      <ProTable<API.EquipmentVO>
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
            新增器材
          </a>,
        ]}
        request={async (params) => {
          console.log('请求参数:', params);
          const res = await request('/api/equipment/list/page/vo', {
            method: 'POST',
            data: {
              current: params.current,
              pageSize: params.pageSize,
              eqName: params.eqName,
            },
          });
          console.log('响应数据:', res);
          return {
            data: res.records || [],
            success: true,
            total: Number(res.total) || 0,
          };
        }}
        editable={{
          type: 'single',
          onSave: async (key, record) => {
            try {
              const res = await updateEquipmentUsingPost({
                eqId: record.eqId,
                eqName: record.eqName,
                eqText: record.eqText,
              });
              console.log('更新响应:', res);
              if (res) {
                message.success('更新成功');
                actionRef.current?.reload();
              } else {
                message.error('更新失败');
              }
            } catch (error) {
              console.error('更新错误:', error);
              message.error('更新失败');
            }
          },
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="eqId"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle=""
      />

      <ModalForm
        title="新增器材"
        width="400px"
        open={createModalVisible}
        onOpenChange={setCreateModalVisible}
        onFinish={async (values) => {
          await handleAdd(values as API.EquipmentAddRequest);
        }}
      >
        <ProFormText
          name="eqName"
          label="器材名称"
          rules={[
            {
              required: true,
              message: '请输入器材名称',
            },
          ]}
        />
        <ProFormText
          name="eqText"
          label="器材描述"
          rules={[
            {
              required: true,
              message: '请输入器材描述',
            },
          ]}
        />
      </ModalForm>
    </div>
  );
}; 