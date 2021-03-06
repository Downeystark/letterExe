'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MinProgramToH5 = function () {

    /* 构造函数 */
    function MinProgramToH5(options) {
        _classCallCheck(this, MinProgramToH5);

        _extends(this, _extends({}, MinProgramToH5.DEFAULTS, options));
        this.Init();
        console.log(this);
    }

    _createClass(MinProgramToH5, [{
        key: 'Init',
        value: function Init() {}

        /* 转换短标签 */

    }, {
        key: 'Run',
        value: function Run() {
            var _this = this;

            this.value = this.string;

            this.RunPhp();

            if (this.tag.double) {
                var _loop = function _loop(key) {
                    if (typeof _this.tag.double[key] === 'string') {
                        _this.TransDouble(key, _this.tag.double[key]);
                    } else {
                        _this.tag.double[key].forEach(function (vv, k) {
                            _this.TransDouble(vv, key);
                        });
                    }
                };

                for (var key in this.tag.double) {
                    _loop(key);
                }
            }

            if (this.tag.single) {
                var _loop2 = function _loop2(key) {
                    /* 是否字符串 */
                    if (typeof _this.tag.single[key] === 'string') {
                        _this.TransSingle(key, _this.tag.single[key]);
                    } else {
                        _this.tag.single[key].forEach(function (vv, k) {
                            _this.TransSingle(vv, key);
                        });
                    }
                };

                for (var key in this.tag.single) {
                    _loop2(key);
                }
            }

            this.TransA();

            return this;
        }

        /* 单标签转双标签 */

    }, {
        key: 'TransSingle',
        value: function TransSingle(label, tag) {
            this.value = this.value.replace(eval('/<' + label + '\\s(.*?)?>/g'), '<' + tag + ' $1></' + tag + '>');
            return this;
        }

        /* 双标签替换 */

    }, {
        key: 'TransDouble',
        value: function TransDouble(label, tag) {
            // 起始标签
            // <i[^n]([\s\S]*?)> <i class="" id="" > 式
            this.value = this.value.replace(eval('/<' + label + '(\\s.*?)>/g'), function (str, match, length) {
                return '<' + tag + ' ' + match + '>';
            });
            // <i> 式
            this.value = this.value.replace(eval('/<' + label + '>/g'), function (str, match, length) {
                return '<' + tag + '>';
            });
            // 结束标签
            this.value = this.value.replace(eval('/<\\/' + label + '>/g'), function (str, match, length) {
                return '</' + tag + '>';
            });
            return this;
        }

        /* A标签属性转换 */

    }, {
        key: 'TransA',
        value: function TransA() {
            this.value = this.value.replace(/href/g, 'url').replace(/[u|U]rl::toRoute\(\[(.*)\]\)/g, '');
            return this;
        }

        /* php语法转换 */

    }, {
        key: 'RunPhp',
        value: function RunPhp() {
            this.TransPhpData().TransPhpIf().TransPhpForeach();

            this.TransPhpArrToJsArr().TransPhpEmpty().TransPhpIsset();
        }

        /* php转换普通数据 */

    }, {
        key: 'TransPhpData',
        value: function TransPhpData() {
            var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tag.php.mustacheStart;
            var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.tag.php.mustacheEnd;
            var discard = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.tag.php.discard;

            this.value = this.value.replace(eval('/<\\?=([\\s\\S]*?)\\?>/g'), function (str, match, length) {
                return label + match + tag;
            });
            return this;
        }

        /* 数组转JS点式数组 */

    }, {
        key: 'TransPhpArrToJsArr',
        value: function TransPhpArrToJsArr() {
            this.value = this.value.replace(/\[['|"](\S*?)['|"]]/g, '.$1').replace(/\$(\S*)/g, '$1');
            return this;
        }

        /* php转换普通数据 */

    }, {
        key: 'TransPhpIf',
        value: function TransPhpIf() {
            var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tag.php.if;

            // 匹配 if 条件语句标签
            this.value = this.value.replace(/<\?php\s*if\s*\(([\s\S]*?)\s*\)\s*[:|{]\s*\?>/g, function (str, match, length) {
                match = match.replace(/^([\s\S]*)/g, tag);
                return '<block ' + match + ' >';
            });
            // 匹配 else if 结束标签
            this.value = this.value.replace(/<\?php\s*elseif\s*\(([\s\S]*?)\s*\)\s*[:|{]\s*\?>/g, '</block>\n<block wx:elif="{{$1}}">');
            // 匹配 else 结束标签
            this.value = this.value.replace(/<\?php\s*(else\s*:|{)\s*\?>/g, function (str, match, length) {
                return '</block>\n<block wx:else>';
            });
            // 匹配 if 结束标签
            this.value = this.value.replace(/<\?php\s*(endif\s*;|})\s*\?>/g, function (str, match, length) {
                return '</block>';
            });
            return this;
        }

        /* php转换普通数据 */

    }, {
        key: 'TransPhpForeach',
        value: function TransPhpForeach() {
            var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tag.php.foreach;

            // 匹配 foreach 条件语句标签
            this.value = this.value.replace(/<\?php\s*foreach\s*\(([\s\S]*?)\)\s*[:|{]\s*\?>/g, function (str, match, length) {
                match = match.replace(/^\$(\S*)\s*as\s*\$(\S*)\s*=>\s*\$(\S*)\s*/g, tag);
                return '<block ' + match + ' >';
            });
            // 匹配 foreach 结束标签
            this.value = this.value.replace(/<\?php\s*(endforeach\s*;|})\s*\?>/g, function (str, match, length) {
                return '</block>';
            });
            return this;
        }

        /* php转换普通数据 */

    }, {
        key: 'TransPhpEmpty',
        value: function TransPhpEmpty() {
            // 匹配 foreach 条件语句标签
            this.value = this.value.replace(/!\s*empty\(([\s\S]*?)\)/g, '$1 != \'\'').replace(/empty\(([\s\S]*?)\)/g, '$1');
            return this;
        }

        /* php转换普通数据 */

    }, {
        key: 'TransPhpIsset',
        value: function TransPhpIsset() {
            // 匹配 foreach 条件语句标签
            this.value = this.value.replace(/!\s*isset\(([\s\S]*?)\)/g, '$1 == undefined').replace(/isset\(([\s\S]*?)\)/g, '$1');
            return this;
        }
    }]);

    return MinProgramToH5;
}();

MinProgramToH5.DEFAULTS = {
    string: '',
    value: '',
    onPress: function onPress(value) {
        console.log(value);
    },
    tag: {
        double: {
            view: ['div', 'p', 'h[1-6]', 'form', 'ul', 'ol', 'li', 'table', 'header', 'main', 'nav'],
            text: ['span', 'strong', 'b', 'label', 'i'],
            a: 'navigator'
        },
        php: {
            discard: '$',
            mustacheStart: '{{',
            mustacheEnd: '}}',
            if: 'wx:if="{{$1}}"',
            foreach: 'wx:for="{{$1}}" wx:for-index="$2" wx:for-item="$3"'
        },
        single: {
            // input: ['input'],
            image: ['img']
        },
        ignore: ['button', 'textarea', 'audio', 'video', 'canvas', 'input']
    },
    done: function done(value) {
        console.log(value);
    }
};
