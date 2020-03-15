import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import _ from 'lodash';
import uuid from 'uuid/v1';

export default function featureEditorStream(props) {
  const { value, onChange } = props;

  return new ValueStream('featureEditor')
    .property('features', value || [], 'array')
    .watchFlat('features', (s, features) => {
      onChange({ target: { value: features } });
    })
    .property('localValue', value, 'object')
    .method('updateFeatureName', (s, name, i) => {
      const features = [...s.my.features];
      if (features[i]) {
        features[i] = { ...s.my.features[i], name };
        s.do.setFeatures(features);
      }
    })
    .method('updateFeatureOptions', (s, options, i) => {
      const features = [...s.my.features];
      if (features[i]) {
        features[i].options = options;
        s.do.setFeatures(features);
      }
    })
    .method('deleteFeature', (s, id) => {
      console.log('deleting features with uid = ', id, 'from', s.my.features);
      const features = s.my.features.filter((v) => v.uid !== id);
      s.do.setFeatures(features);
    })
    .method('addFeature', (s) => {
      s.do.setFeatures([...s.my.features, {
        id: uuid(),
        name: 'new feature',
        options: [],
      }]);
    });
}
