
export const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    commit("types.ADD_TO_CART", {
      id: product.id
    })
  }
};
export const setActiveCityObj = ({commit}, data) => {
  commit("setActiveCityObj", data);
};

export const setIsBigDataMenu = ({commit}, state) => {
  commit("setIsBigDataMenu", state);
};

export const setMenuLiWidth = ({commit}, data) => {
  commit("setMenuLiWidth", data);
};



