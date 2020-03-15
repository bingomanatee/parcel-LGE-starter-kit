import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';
import _ from 'lodash';

const API_ROOT = 'http://localhost:3000/dress_types/';
const newDressType = () => ({ name: 'a new dress type', features: [] });
export default (props) => {
  const dressTypes = new ValueStream('dressTypes')
    .property('dressTypes', [], 'array')
    .property('tabIndex', 0, 'integer')
    .property('newDressType', newDressType(), 'object')
    .method('saveNewDressType', (s, event) => {
      const value = _.get(event, 'value');
      if (!value) return;
      s.do.setTabIndex(0);
      s.do.setNewDressType(newDressType());
      axios.post(API_ROOT, { dress_type: value })
        .then(s.do.load)
        .catch((err) => {
          console.log('save error:', err);
          s.do.load();
        });
    })
    .method('updateNewDressType', (s, value) => {
      console.log('update new dress type:', value);
      Object.assign(s.my.newDressType, value);
    })
    .method('featureChanged', (s, data) => {
      const features = _.get(data, 'target.value');
      if (Array.isArray(features)) {
        s.my.newDressType.features = features;
        s.do.setNewDressType(s.my.newDressType);
      }
    })
    .method('load', (s) => {
      axios.get(API_ROOT)
        .then(({ data }) => {
          s.do.setDressTypes(data);
        })
        .catch((err) => {
          console.log('dress types load error: ', err);
        });
    });

  dressTypes.do.load();
  return dressTypes;
};
