import { observable } from 'mobx';

class Nav {
  @observable navigator = null;
  @observable content = null;
  @observable ads = 0;
}

const nav = new Nav();

export default nav;
