import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface DeleteHistoryButtonProps {
  onConfirm: () => void;
}

export function DeleteHistoryButton({ onConfirm }: DeleteHistoryButtonProps) {
  return (
    <Popconfirm
      title="Удалить запись из истории?"
      description="Это действие нельзя отменить."
      okText="Удалить"
      cancelText="Отмена"
      okButtonProps={{ danger: true }}
      onConfirm={onConfirm}
    >
      <Button type="text" danger size="small" icon={<DeleteOutlined />}>
        Удалить
      </Button>
    </Popconfirm>
  );
}