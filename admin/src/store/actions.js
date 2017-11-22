import session from '@/config/session'
export const setMenu = ({commit}, that) => {

  //设置导航菜单
  let userType = session.get("userType");
  let roleIds = (session.get("roleIds")).split(',');
  let menu = [];
  that.$router.options.routes.forEach((item, index) => {

    if (item.meta && item.meta.menu) {
      let isScope = false;
      if (item.meta.userType) {
        item.meta.userType.forEach(item => {
          if (item == userType) isScope = true;

        });
        if (!isScope) return;
      }
      if (item.meta.roleIds) {
        isScope = false;
        item.meta.roleIds.forEach(item => {
          roleIds.forEach(roleItem => {
            if (item == roleItem) isScope = true;
          })
        });
        if (!isScope) return;
      }
      let json = {
        name: item.name,
        meta: item.meta
      };
      menu.push(json);
      if (that.$route.name == item.name) that.openNames.push(menu.length - 1);

      let children = [];
      if (item.children.length) {
        item.children.forEach(chItem => {
          let isScopeCh = false;
          if (chItem.meta.userType) {

            chItem.meta.userType.forEach(itemCh => {
              if (itemCh == userType) isScopeCh = true;
            });
            if (!isScopeCh) return;
          }
          if (chItem.meta.roleIds) {
            isScopeCh = false;
            chItem.meta.roleIds.forEach(item => {
              roleIds.forEach(roleItem => {
                if (item == roleItem) isScopeCh = true;
              })
            });
            if (!isScopeCh) return;
          }

          children.push({
            name: chItem.name,
            meta: chItem.meta
          });
          if (that.$route.name == chItem.name) {
            that.openNames.push(menu.length - 1);
          }
        });
      }

      json.children = children;
    }
  });
  menu.forEach(item => {
    item.menu = false;
    if (item.children) {
      item.children.forEach(subItem => {
        if (subItem.meta.menu) item.menu = true;
      });
    }
  });
  if (session.get("roleIds") == 35 ) {
    menu.splice(2, 1);
    if(session.get("adminDivisionId") != '5101' && session.get("adminDivisionId")!='null') menu[2].children.splice(1, 1);
  }
  commit("setMenu", menu);
};
