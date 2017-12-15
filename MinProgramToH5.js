class MinProgramToH5 {

    static DEFAULTS = {
        string: '',
        value: '',
        onPress: (value) => {
            console.log(value);
        },
        tag: {
            double: {
                view: [
                    'div', 'p', 'h[1-6]', 'form', 'ul', 'ol', 'li', 'table'
                ],
                text: [
                    'span', 'strong', 'b', 'label', 'i'
                ],
                a: 'navigator',
            },
            php: {
                discard: '$',
                mustacheStart: '{{',
                mustacheEnd: '}}',
                ifStart: '<block wx:if="{{',
                ifEnd: '}}">',
                foreach: 'wx:for="{{$1}}" wx:for-index="{{$2}}" wx:for-item={{$3}}',
            },
            single: {
                input: ['input'],
                image: ['img']
            },
            ignore: [
                'button', 'textarea', 'audio', 'video', 'canvas'
            ]
        },
        done: (value) => {
            console.log(value);
        }
    };

    /* 构造函数 */
    constructor(options) {
        Object.assign(this, {...MinProgramToH5.DEFAULTS, ...options});
        this.Init();
        console.log(this);
    }

    Init() {

    }

    /* 转换短标签 */
    Run() {
        this.value = this.string;

        if (this.tag.double) {
            for (let key in this.tag.double) {
                if (typeof this.tag.double[key] === 'string') {
                    this.TransDouble(key, this.tag.double[key]);
                } else {
                    this.tag.double[key].forEach((vv, k) => {
                        this.TransDouble(vv, key);
                    })
                }
            }
        }

        if (this.tag.single) {
            for (let key in this.tag.single) {
                /* 是否字符串 */
                if (typeof this.tag.single[key] === 'string') {
                    this.TransSingle(key, this.tag.single[key]);
                } else {
                    this.tag.single[key].forEach((vv, k) => {
                        this.TransSingle(vv, key);
                    })
                }

            }
        }

        this.RunPhp();

        return this;
    }

    /* 单标签转双标签 */
    TransSingle(label, tag) {
        this.value = this.value.replace(eval('/<' + label + '\\s(.*?)?>/g'), '<' + tag + ' $1></' + tag + '>')
        return this;
    }

    /* 双标签替换 */
    TransDouble(label, tag) {
        this.value = this.value.replace(eval('/<' + label + '([\\s\\S]*?)<\\/' + label + '>/g'), (str, match, length) => {
            return '<' + tag + match + '</' + tag + '>';
        });
        return this;
    }

    /* php语法转换 */
    RunPhp() {
        this.TransPhpData().TransPhpIf().TransPhpForeach();

    }

    /* php转换普通数据 */
    TransPhpData(label = this.tag.php.mustacheStart, tag = this.tag.php.mustacheEnd, discard = this.tag.php.discard) {
        this.value = this.value.replace(eval('/<\\?=([\\s\\S]*?)\\?>/g'), (str, match, length) => {
            match = match.replace(eval('/\\$/g'), '').replace(eval('/\\[[\'|\"]([\\s\\S]*?)[\'|\"]\\]/g'), (s, m, l) => {
                return '.' + m;
            });
            return label + match + tag;
        });
        return this;
    }

    /* php转换普通数据 */
    TransPhpIf(label = this.tag.php.ifStart, tag = this.tag.php.ifEnd, discard = this.tag.php.discard) {
        // 匹配 if 条件语句标签
        this.value = this.value.replace(/<\?php\s*if\s*\(([\s\S]*?)\s*\)\s*[:|{]\s*\?>/g, (str, match, length) => {
            // 数组转JS点式数组
            match = match.replace(eval('/\\$/g'), '').replace(eval('/\\[[\'|\"]([\\s\\S]*?)[\'|\"]\\]/g'), (s, m, l) => {
                return '.' + m;
            });
            return label + match + tag;
        });
        // 匹配 if 结束标签
        this.value = this.value.replace(/<\?php\s*(endif\s*;|})\s*\?>/g, (str, match, length) => {
            return '</block>';
        });
        return this;
    }

    /* php转换普通数据 */
    TransPhpForeach(tag = this.tag.php.foreach, discard = this.tag.php.discard) {
        // 匹配 if 条件语句标签
        this.value = this.value.replace(/<\?php\s*foreach\s*\(([\s\S]*?)\)\s*[:|{]\s*\?>/g, (str, match, length) => {
            match = match.replace(/^\$(\S*)\s*as\s*\$(\S*)\s*=>\s*\$(\S*)\s*/g, tag).replace(eval('/\\$/g'), '').replace(eval('/\\[[\'|\"]([\\s\\S]*?)[\'|\"]\\]/g'), (s, m, l) => {
                return '.' + m;
            });
            return '<block ' + match + ' >';
        });
        // 匹配 if 结束标签
        this.value = this.value.replace(/<\?php\s*(endforeach\s*;|})\s*\?>/g, (str, match, length) => {
            return '</block>';
        });
        return this;
    }


}

