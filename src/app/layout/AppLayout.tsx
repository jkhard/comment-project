import { Layout, Menu, Avatar, Typography } from "antd";
import { MessageOutlined, HistoryOutlined, UserOutlined } from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const { Sider, Header, Content } = Layout;

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = location.pathname.startsWith("/history") ? "history" : "classifier";

  return (
    <Layout className="app-shell">
      <Sider width={220} breakpoint="lg" collapsedWidth={0}>
        <div className="sider-title">
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
        <Header className="app-header">
          <Typography.Text style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
            Демо-пользователь · выйти
          </Typography.Text>
          <Avatar size={32} icon={<UserOutlined />} />
        </Header>
        <Content>
          {/* key меняется при смене адреса — поэтому анимация появления
              страницы проигрывается при каждом переходе. */}
          <div key={location.pathname} className="page-transition">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}