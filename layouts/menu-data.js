const MenuData = [
  {
    path: "footpoint",
    name: "foot-point",
    meta: { title: "足迹点管理", icon: "location" }
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
