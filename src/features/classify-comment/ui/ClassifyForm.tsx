import { Button, Form, Input, Space } from "antd";
import { commentRules } from "../../../shared/lib/validation";

const { TextArea } = Input;

interface ClassifyFormValues {
  text: string;
}

interface ClassifyFormProps {
  loading: boolean;
  onSubmit: (text: string) => void;
  onReset: () => void;
}

const EXAMPLES = {
  positive: "Доставили быстрее, чем обещали, упаковка целая. Очень довольна, спасибо!",
  negative: "Ужасное качество: товар сломан, а поддержка отвечает очень долго.",
};

export function ClassifyForm({ loading, onSubmit, onReset }: ClassifyFormProps) {
  const [form] = Form.useForm<ClassifyFormValues>();

  const handleFinish = (values: ClassifyFormValues) => {
    onSubmit(values.text.trim());
  };

  const fillExample = (text: string) => {
    form.setFields([{ name: "text", value: text, errors: [] }]);
  };

  const handleClear = () => {
    form.resetFields();
    onReset();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} requiredMark={false}>
      <Form.Item
        name="text"
        label="Текст комментария"
        rules={commentRules}
        validateFirst
        validateTrigger={["onChange", "onBlur"]}
      >
        <TextArea
          autoSize={{ minRows: 5, maxRows: 10 }}
          showCount
          disabled={loading}
          placeholder="Например: «Заказ пришёл вовремя, упаковка аккуратная, спасибо!»"
        />
      </Form.Item>

      <div className="example-row">
        <span>Вставить пример:</span>
        <Button size="small" onClick={() => fillExample(EXAMPLES.positive)} disabled={loading}>
          положительный
        </Button>
        <Button size="small" onClick={() => fillExample(EXAMPLES.negative)} disabled={loading}>
          отрицательный
        </Button>
      </div>

      <Space>
        <Button type="primary" size="large" htmlType="submit" loading={loading}>
          Классифицировать
        </Button>
        <Button size="large" onClick={handleClear} disabled={loading}>
          Очистить
        </Button>
      </Space>
    </Form>
  );
}