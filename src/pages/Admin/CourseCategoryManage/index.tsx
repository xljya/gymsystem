import { 
  addCategoryUsingPost, 
  deleteCategoryUsingPost, 
  updateCategoryUsingPost,
  listCategoryByPageUsingPost
} from '@/api/courseCategoryController';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, ProFormText, ProTable, TableDropdown } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef, useState } from 'react';

// 课程类别管理
const columns: ProColumns<API.CourseCategoryVO>[] = [
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
    title: '类别ID',
    dataIndex: 'categoryId',
    hideInSearch: true,
    editable: false,
  },
  {
    title: '课程类别名称',
    dataIndex: 'categoryName',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [{ required: true, message: '请输入课程类别名称' }],
    },
  },
  {
    title: '类别描述',
    dataIndex: 'categoryDesc',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInSearch: true,
    editable: false,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
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
          if (record.categoryId) {
            action?.startEditable?.(record.categoryId);
          }
        }}
      >
        编辑
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={async (key) => {
          if (key === 'delete' && record.categoryId) {
            try {
              const res = await deleteCategoryUsingPost({ id: record.categoryId });
              console.log('删除响应:', res);
              if (res) {
                message.success('删除成功');
                action?.reload();
              } else {
                message.error('删除失败');
              }
            } catch (error) {
              console.error('删除错误:', error);
              message.error('删除失败');
            }
          }
        }}
        menus={[{ key: 'delete', name: '删除' }]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [createVisible, setCreateVisible] = useState(false);

  const handleAdd = async (fields: API.CourseCategoryAddRequest) => {
    try {
      const res = await addCategoryUsingPost(fields);
      if (res) {
        message.success('添加成功');
        setCreateVisible(false);
        actionRef.current?.reload();
      } else {
         message.error('添加失败');
      }
    } catch {
      message.error('添加异常');
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: 120, marginBottom: 60 }}>
      <ProTable<API.CourseCategoryVO>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        toolBarRender={() => [
          <a
            key="add"
            onClick={() => {
              setCreateVisible(true);
            }}
          >
            新增课程类别
          </a>,
        ]}
        request={async (params) => {
          // 打印请求参数，便于调试
          console.log('请求参数:', params);
          // 发送 POST 请求到后端接口，获取课程类别分页数据
          try {
            const res = await listCategoryByPageUsingPost({
              current: params.current,
              pageSize: params.pageSize,
              categoryName: params.categoryName,
            }) as API.PageCourseCategoryVO_;
            // 打印响应数据，便于调试
            console.log('响应数据:', res);
            // 返回 ProTable 需要的数据格式
            return {
              data: res.records || [],
              success: true,
              total: Number(res.total) || 0,
            };
          } catch (error) {
            console.error('获取课程类别列表失败:', error);
            message.error('获取课程类别列表失败');
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
              const res = await updateCategoryUsingPost({
                categoryId: record.categoryId,
                categoryName: record.categoryName,
                categoryDesc: record.categoryDesc,
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
              message.error('更新异常');
            }
          },
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
        }}
        rowKey="categoryId"
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
          onChange: (page) => console.log('当前页:', page),
        }}
        dateFormatter="string"
        headerTitle=""
      />

      <ModalForm
        title="新增课程类别"
        width={400}
        open={createVisible}
        onOpenChange={setCreateVisible}
        onFinish={async (values) => {
          await handleAdd(values as API.CourseCategoryAddRequest);
        }}
      >
        <ProFormText
          name="categoryName"
          label="类别名称"
          rules={[{ required: true, message: '请输入类别名称' }]}
        />
        <ProFormText name="categoryDesc" label="类别描述" />
      </ModalForm>
    </div>
  );
};
