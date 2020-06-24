const MenuData = [
  {
    path: "footpoint",
    name: "foot-point",
    meta: { title: "足迹点管理", icon: "location" }
  },
  {
    path: "user",
    name: "用户列表",
    meta: { title: "用户列表", icon: "s-people" }
  },
  {
    path: "demo",
    name: "demo",
    meta: { title: "Demo", icon: "s-promotion" }
  },
  {
    path: "test",
    name: "test",
    meta: { title: "测试子目录菜单", icon: "s-promotion" },
    children: [
      {
        path: "child1",
        name: "child1",
        meta: { title: "子目录1" }
      },
      {
        path: "child2",
        name: "child2",
        meta: { title: "子目录2" }
      }
    ]
  }
];
export default MenuData;
