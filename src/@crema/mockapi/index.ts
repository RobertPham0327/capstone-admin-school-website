import mock from './apis/MockConfig';
import './apis/index';

mock.onAny().passThrough();
