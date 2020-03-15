import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import _ from 'lodash';
import uuid from 'uuid/v1';

export default function featureEditorStream(props) {
  const { options: initialOptions, onChange } = props;

  return new ValueStream('optionsEditor')
    .property('options', initialOptions || [], 'array')
    .watchFlat('options', (s, options) => {
      onChange(options);
    })
    .method('updateOption', (s, option, name) => {
      option.name = name;
      const options = [...s.my.options];
      s.do.setOptions(options);
    })
    .method('deleteOption', (s, uid) => {
      const options = s.my.options.filter((v) => v.uid !== uid);
      s.do.setOptions(options);
    })
    .method('addOption', (s) => {
      s.do.setOptions([...s.my.options, {
        name: 'new option',
        uid: uuid(),
      }]);
    });
}
