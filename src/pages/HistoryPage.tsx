import { Table, Typography, type TableColumnsType } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { mockHistory } from "../data/mockHistory";
import type { HistoryEntry } from "../types";

const columns: TableColumnsType<HistoryEntry> = [
  {
    title: "Комментарий",
    dataIndex: "text",
    key: "text",
    render: (text: string) => (
      <Typography.Text style={{ maxWidth: 420 }} ellipsis={{ tooltip: text }}>
        {text}
      </Typography.Text>
    ),
  },
  {
    title: "Результат",
    dataIndex: "label",
    key: "label",
    width: 170,
    render: (label: HistoryEntry["label"]) =>
      label === "positive" ? (
        <span className="result-badge result-badge--positive">
          <SmileOutlined /> Положительный
        </span>
      ) : (
        <span className="result-badge result-badge--negative">
          <FrownOutlined /> Отрицательный
        </span>
      ),
  },
  {
    title: "Дата",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 140,
    render: (value: string) =>
      new Date(value).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
  },
];

export default function HistoryPage() {
  return (
    <div className="page-container" style={{ maxWidth: 900 }}>
      <p className="page-eyebrow">Сохранённые запросы</p>
      <h1 className="page-title">История</h1>
      <p className="page-subtitle">
        Здесь собраны все ранее отправленные комментарии вместе с
        результатом их классификации.
      </p>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={mockHistory}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}