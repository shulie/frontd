import { configure, setAddon} from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import { setOptions } from '@kadira/storybook-addon-options';

setAddon(infoAddon);
setOptions({
  name: 'datahunter API',
  url: 'https://github.com/kadirahq/storybook-addon-options',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
  sortStoriesByKind: false,
});
import '../src/index.scss';
import 'antd/dist/antd.css';
import './test.scss';

function loadStories() {
  require('../stories/tinymce/index.js')
  require('../stories/form/index.js');
  require('../stories/button/index.js');
  require('../stories/list/index.js');
  require('../stories/tooltip/index.js');
  require('../stories/popover/index.js');
  require('../stories/carousel/index.js');
  require('../stories/icon/index.js');
  require('../stories/modal/index.js');
  require('../stories/table/index.js');
  require('../stories/dropdown/index.js');
  require('../stories/tabs/index.js');
  require('../stories/radio/index.js');
  require('../stories/checkbox/index.js');
  require('../stories/slider/index.js');
  require('../stories/select/index.js');
  require('../stories/color_picker/index.js');
  require('../stories/menu/index.js');
  require('../stories/message/index.js');
  require('../stories/datasheet/index.js');
  require('../stories/spin/index.js');
  require('../stories/date_picker/index.js');
}
configure(loadStories, module);
