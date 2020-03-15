import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';
import _ from 'lodash';
import uuid from 'uuid/v1';

const API_ROOT = 'http://localhost:3000/dress_types/';

const combineFeatures = (features) => {
  const list = _.groupBy(features, 'name');
  Object.keys(list).forEach((key) => {
    list[key] = _(list[key]).map('value').sortBy().value();
  });
  return _.reduce(list, (out, options, name) => [...out, {
    uid: uuid(),
    name,
    options: options.map((name) => ({
      name,
      uid: uuid(),
    })),
  }], []);
};

export default (props) => {
  const id = _.get(props, 'match.params.id', 0);
  const { history } = props;
  const dressTypes = new ValueStream('dressStylesEdit')
    .property('dressType', null)
    .property('id', id)
    .method('save', (s, event) => {
      const value = _.get(event, 'value');
      if (!value) return;
      console.log('saving --- ', value);
      axios.put(API_ROOT + id, { dress_type: value })
        .then(() => history.push('/admin/dress-styles'))
        .catch((err) => {
          console.log('save error:', err);
          s.do.load();
        });
    })
    .method('update', (s, value) => {
      Object.assign(s.my.dressType, value);
    })
    .method('featureChanged', (s, data) => {
      const features = _.get(data, 'target.value');
      if (Array.isArray(features)) {
        s.my.dressType.features = features;
        s.do.setDressType(s.my.dressType);
      }
    })
    .method('load', (s) => {
      axios.get(API_ROOT + id)
        .then(({ data }) => {
          if (data.dress_type_features) {
            data.features = combineFeatures(data.dress_type_features);
            delete data.dress_type_features;
          }
          s.do.setDressType(data);
        })
        .catch((err) => {
          console.log('dress types load error: ', err);
        });
    });

  dressTypes.do.load();
  return dressTypes;
};
