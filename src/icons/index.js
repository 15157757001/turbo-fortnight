import Vue from 'vue'
import SvgIcon from '../../components/common/SvgIcon'
/* require.context("./test", false, /.test.js$/);
    ���д���ͻ�ȥ test �ļ��У���������Ŀ¼�� ������������ļ����� .test.js ��β���ļ��ܱ� require ���ļ���
    ��ֱ�׵�˵���� ���ǿ���ͨ������ƥ��������Ӧ���ļ�ģ�顣
     require.context������������ 
     directory��˵����Ҫ������Ŀ¼ 
     useSubdirectories���Ƿ������Ŀ¼ 
     regExp: ƥ���ļ���������ʽ */
//ȫ��ע�� 
Vue.component('svg-icon', SvgIcon) 
const requireAll = requireContext => requireContext.keys().map(requireContext) 
const req = require.context('./svg', false, /\.svg$/) 
requireAll(req)
