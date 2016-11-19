import { observable } from 'mobx';

class Nav {
  @observable navigator = null;
  @observable content = null;
}

const nav = new Nav();

export default nav;
