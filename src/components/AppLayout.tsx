import { Layout, Menu, Avatar, Typography } from "antd";
import {
  MessageOutlined,
  HistoryOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const { Sider, Header, Content } = Layout;
export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = location.pathname.startsWith("/history")
    ? "history"
    : "classifier";

  return (
    <Layout className="app-shell">
      <Sider width={220} breakpoint="lg" collapsedWidth={0}>
        <div
          style={{
            color: "#fff",
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: 18,
            padding: "20px 20px 16px",
          }}
        >
          Классификатор
          <br />
          комментариев
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={[
            {
              key: "classifier",
              icon: <MessageOutlined />,
              label: <Link to="/">Новый запрос</Link>,
            },
            {
              key: "history",
              icon: <HistoryOutlined />,
              label: <Link to="/history">История</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 10,
            borderBottom: "1px solid var(--color-border)",
            padding: "0 24px",
          }}
        >
          <Typography.Text
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Елена Афонина · выйти
          </Typography.Text>
          <Avatar size={32} icon={<UserOutlined />} />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}