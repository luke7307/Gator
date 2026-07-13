// Gator - 信息效率工具箱
const STORAGE_KEY = 'gator_items_v4';
const BG_COLOR_KEY = 'gator_bg_color';
const LAYOUT_KEY = 'gator_layout';
const NOTEBOOKS_KEY = 'gator_notebooks';
const CURRENT_NOTEBOOK_KEY = 'gator_current_notebook';
const THEME_KEY = 'gator_theme';
const TAGS_KEY = 'gator_tags';
const EMOJI_RECENT_KEY = 'gator_emoji_recent';

// 主题色配置
const THEMES = {
    blue: {
        primary: '#3B82F6', primaryDark: '#2563EB', primaryLight: '#DBEAFE',
        primaryFaint: '#EFF6FF', bg: '#EFF6FF',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
        complementary: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
        complementaryFaint: '#FFF7ED', complementaryLight: '#FED7AA', complementaryDark: '#C2410C'
    },
    purple: {
        primary: '#8B5CF6', primaryDark: '#7C3AED', primaryLight: '#EDE9FE',
        primaryFaint: '#F5F3FF', bg: '#F5F3FF',
        gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        complementary: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        complementaryFaint: '#FFFBEB', complementaryLight: '#FDE68A', complementaryDark: '#B45309'
    },
    green: {
        primary: '#10B981', primaryDark: '#059669', primaryLight: '#D1FAE5',
        primaryFaint: '#ECFDF5', bg: '#ECFDF5',
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        complementary: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        complementaryFaint: '#F5F3FF', complementaryLight: '#DDD6FE', complementaryDark: '#6D28D9'
    },
    orange: {
        primary: '#F59E0B', primaryDark: '#D97706', primaryLight: '#FEF3C7',
        primaryFaint: '#FFFBEB', bg: '#FFFBEB',
        gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        complementary: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
        complementaryFaint: '#EFF6FF', complementaryLight: '#BFDBFE', complementaryDark: '#1D4ED8'
    },
    pink: {
        primary: '#EC4899', primaryDark: '#DB2777', primaryLight: '#FCE7F3',
        primaryFaint: '#FDF2F8', bg: '#FDF2F8',
        gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
        complementary: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
        complementaryFaint: '#F0FDFA', complementaryLight: '#99F6E4', complementaryDark: '#0F766E'
    },
    red: {
        primary: '#EF4444', primaryDark: '#DC2626', primaryLight: '#FEE2E2',
        primaryFaint: '#FEF2F2', bg: '#FEF2F2',
        gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
        complementary: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
        complementaryFaint: '#EFF6FF', complementaryLight: '#BFDBFE', complementaryDark: '#1D4ED8'
    },
    teal: {
        primary: '#14B8A6', primaryDark: '#0D9488', primaryLight: '#CCFBF1',
        primaryFaint: '#F0FDFA', bg: '#F0FDFA',
        gradient: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
        complementary: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)',
        complementaryFaint: '#FFF1F2', complementaryLight: '#FECDD3', complementaryDark: '#BE123C'
    },
    dark: {
        primary: '#374151', primaryDark: '#1F2937', primaryLight: '#E5E7EB',
        primaryFaint: '#F3F4F6', bg: '#F3F4F6',
        gradient: 'linear-gradient(135deg, #374151 0%, #1F2937 100%)',
        complementary: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
        complementaryFaint: '#F0FDFA', complementaryLight: '#99F6E4', complementaryDark: '#0F766E'
    }
};

// 默认标签配置
const DEFAULT_TAGS = [
    { id: 'all', name: '全部', emoji: '', editable: false, deletable: false },
    { id: 'efficiency', name: '效率', emoji: '⚡', editable: true, deletable: true },
    { id: 'tool', name: '工具', emoji: '🛠️', editable: true, deletable: true },
    { id: 'collect', name: '收藏', emoji: '⭐', editable: true, deletable: true },
    { id: 'custom', name: '自定义', emoji: '🔧', editable: true, deletable: true }
];

// 效率/办公/工具类 emoji（放在最前面）
const EFFICIENCY_EMOJIS = [
    '💡','⚡','🔥','✨','⭐','🎯','📌','📎','✏️','📝','📋','📁','📂','🗂️','📊','📈','📉',
    '🗓️','📅','⏰','⏱️','🔑','🔒','🔓','⚙️','🛠️','🔧','🔨','🧲','📐','📏','✂️','🏷️','🔍','🔎',
    '💻','📱','📲','🖥️','⌨️','🖨️','🖱️','💾','💿','📀','📷','📸','📹','🎥','📞','☎️','📟','📠',
    '📺','📻','🎙️','🎚️','🎛️','🧭','📡','🔋','🔌','🔦','🏮','🧯','💸','💵','💴','💶','💷','💰',
    '💳','💎','⚖️','🪜','🧰','🪛','🧨','🪓','🔪','🗡️','⚔️','🛡️','🔮','📿','🧿','💈','⚗️','🔭',
    '🔬','🧬','🦠','🧫','🧪','🌡️','🧹','🧺','🧻','🚽','🚰','🚿','🛁','🛀','🧼','🪥','🪒','🧽',
    '🪣','🧴','🛎️','🗝️','🚪','🪑','🛋️','🛏️','🛌','🧸','🪆','🖼️','🪞','🪟','🛍️','🛒','🎁','🎈',
    '🎏','🎀','🪄','🪅','🎊','🎉','✉️','📩','📨','📧','💌','📥','📤','📦','📜','📃','📄','📑',
    '🧾','🔖','🧷','🔗','🖇️','🪝','🪡','🧵','🧶','🪢','🪪','🪫','🪬'
];

// 内置 Emoji 图标库（去重，效率类在前，笑脸类在后）
const EMOJI_LIBRARY = (() => {
    const allEmojis = [
        // 效率/办公/工具类（放在最前面）
        ...EFFICIENCY_EMOJIS,
        // 笑脸类
        '😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩',
        '😘','😗','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🫡',
        '🤐','🤨','😐','😑','😶','🫥','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴',
        '😷','🤒','🤕','🤢','🤮','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸','😎','🤓','🧐',
        '😕','🫤','😟','🙁','😮','😯','😲','😳','🥺','🥹','😦','😧','😨','😰','😥','😢',
        '😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀',
        '💩','🤡','👹','👺','👻','👽','👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿',
        '😾','❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗',
        '💖','💘','💝','💟','☮️','✝️','☪️','🕉','☸️','✡️','🔯','🕎','☯️','☦️','🛐','⛎',
        '♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚛️','🉑','☢️',
        '☣️','📴','📳','🈶','🈚','🈸','🈺','🈷️','✴️','🆚','💮','🉐','㊙️','㊗️','🈴','🈵',
        '🈹','🈲','🅰️','🅱️','🆎','🆑','🅾️','🆘','❌','⭕','🛑','⛔','📛','🚫','💯','💢',
        '♨️','🚷','🚯','🚳','🚱','🔞','📵','🚭','❗','❕','❓','❔','‼️','⁉️','🔅','🔆',
        '〽️','⚠️','🚸','🔱','⚜️','🔰','♻️','✅','🈯','💹','❇️','✳️','❎','🌐','💠','Ⓜ️',
        '🌀','💤','🏧','🚾','♿','🅿️','🈳','🈂️','🛂','🛃','🛄','🛅','🚹','🚺','🚼','⚧️',
        '🚻','🚮','🎦','📶','🈁','🔣','ℹ️','🔤','🔡','🔠','🆖','🆗','🆙','🆒','🆕','🆓',
        '0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟','🔢','#️⃣','*️⃣','⏏️','▶️',
        '⏸️','⏯️','⏹️','⏺️','⏭️','⏮️','⏩','⏪','⏫','⏬','◀️','🔼','🔽','➡️','⬅️','⬆️',
        '⬇️','↗️','↘️','↙️','↖️','↕️','↔️','↪️','↩️','⤴️','⤵️','🔀','🔁','🔂','🔄','🔃',
        '🎵','🎶','➕','➖','➗','✖️','🟰','♾️','💲','💱','™️','©️','®️','👁️‍🗨️','🔚','🔙',
        '🔛','🔝','🔜','〰️','➰','➿','✔️','☑️','🔘','🔴','🟠','🟡','🟢','🔵','🟣','⚫',
        '⚪','🟤','🔺','🔻','🔸','🔹','🔶','🔷','🔳','🔲','▪️','▫️','◾','◽','◼️','◻️',
        '🟥','🟧','🟨','🟩','🟦','🟪','⬛','⬜','🟫','🔈','🔇','🔉','🔊','🔔','🔕','📣',
        '📢','💬','💭','🗯️','♠️','♣️','♥️','♦️','🃏','🎴','🀄','🕐','🕑','🕒','🕓','🕔',
        '🕕','🕖','🕗','🕘','🕙','🕚','🕛','🕜','🕝','🕞','🕟','🕠','🕡','🕢','🕣','🕤',
        '🕥','🕦','🕧','🕯️','🪔','🛢️','🪙','⛏️','🪚','🔩','🪤','🧱','⛓️','🔫','💣',
        '🚬','⚰️','🪦','⚱️','🏺','🕳️','🩹','🩺','🩻','💊','💉','🩸','🪠',
        '🗑️','📇','🗃️','🗳️','🗄️','🗞️','📰','📓','📔','📒','📕','📗','📘','📙','📚','📖',
        '📍','🖊️','🖋️','✒️','🖌️','🖍️','🔏','🔐','🪧','📪','📫','📬','📭','📮','📯',
        '🧮','⌛','⏳','🕰️','📼','📽️','🎞️','🖲️','🕹️','🗜️',
        '🌟','💫','🌈','☀️','🌤️','⛅','🌥️','☁️','🌦️','🌧️','⛈️','🌩️',
        '🌨️','❄️','☃️','⛄','🌬️','🌪️','🌫️','🌊','💧','💦','☔','🫧','🪷','🪹',
        '🪺','🌿','🍀','🌱','🌲','🌳','🌴','🌵','🌾','☘️','🍁','🍂','🍃','🍄','🪴',
        '🌰','🫒','🫐','🍇','🍈','🍉','🍊','🍋','🍌','🍍','🥭','🍎','🍏','🍐','🍑','🍒',
        '🍓','🥝','🍅','🥥','🥑','🍆','🥔','🥕','🌽','🌶️','🫑','🥒','🥬','🥦','🧄','🧅',
        '🥜','🫘','🍞','🥐','🥖','🫓','🥨','🥯','🥞','🧇','🧀','🍖','🍗','🥩','🥓','🍔',
        '🍟','🍕','🌭','🥪','🌮','🌯','🫔','🥙','🧆','🥚','🍳','🥘','🍲','🫕','🥣','🥗','🍿',
        '🧈','🥫','🍱','🍘','🍙','🍚','🍛','🍜','🍝','🍠','🍢','🍣','🍤','🍥','🥮','🍡',
        '🥟','🥠','🥡','🦀','🦞','🦐','🦑','🦪','🍦','🍧','🍨','🍩','🍪','🎂','🍰','🧁',
        '🥧','🍫','🍬','🍭','🍮','🍯','🍼','🥛','☕','🫖','🍵','🧃','🥤','🧋','🍶','🍺',
        '🍻','🥂','🍷','🥃','🍸','🍹','🧉','🍾','🧊','🥄','🍴','🍽️','🥢','🧂',
        '🏆','🥇','🥈','🥉','🏅','🎖️','🏵️','🎗️','🎫','🎟️','🎪','🤹',
        '🎭','🩰','🎨','🎬','🎤','🎧','🎼','🎹','🥁','🪘','🎷','🎺','🎸','🪕','🎻','🎲',
        '♟️','🎯','🎳','🎮','🧩','🪭','🪮','🪯','🪰','🪱','🪲','🪳','🪵','🪶','🪸',
        '🪻','🪼','🪽','🪾','🪿','🫀','🫁','🫂','🫃','🫄','🫅','🫆','🫇','🫈','🫉','🫊',
        '🫋','🫌','🫍','🫎','🫏','🫐','🫑','🫒','🫓','🫔','🫕','🫖','🫗','🫘','🫙','🫚',
        '🫛','🫠','🫡','🫢','🫣','🫤','🫥','🫶','🫷','🫸','🫹','🫺','🩷','🩵','🩶',
        '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐻‍❄️',
        '🐨','🐯','🦁','🐮','🐷','🐽','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤',
        '🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞',
        '🐜','🦟','🦗','🕷️','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐',
        '🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🦣',
        '🐘','🦛','🦏','🐪','🐫','🦒','🦘','🦬','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙',
        '🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈','🐈‍⬛','🪶','🐓','🦃','🦤','🦚','🦜','🦢','🦩',
        '🕊️','🐇','🦝','🦨','🦡','🦫','🦦','🦥','🐁','🐀','🐿️','🦔','🐾','🐉','🐲','🎍','🎋',
        '💐','🌷','🌹','🥀','🌺','🌸','🌼','🌻','🌞','🌝','🌛','🌜','🌚','🌕','🌖','🌗',
        '🌘','🌑','🌒','🌓','🌔','🌙','🌎','🌍','🌏','🪐','☄️',
        '💥','🌪️','☂️','🪩','🪨','🪥','🪤','🪥',
        '⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🪀','🏓','🏸','🏒','🏑','🥍',
        '🏏','🪃','🥅','⛳','🪁','🏹','🎣','🤿','🥊','🥋','🎽','🛹','🛼','🛷','⛸️','🥌',
        '🎿','⛷️','🏂','🪂','🏋️','🤼','🤸','🤺','⛹️','🤾','🏌️','🏇','🧘','🏄','🏊','🤽',
        '🚣','🧗','🚴','🚵',
        '🚐','🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚚','🚛','🚜','🛴','🚲',
        '🛵','🏍️','🛺','🚨','🚔','🚍','🚘','🚖','🚡','🚠','🚟','🚃','🚋','🚞','🚝','🚄',
        '🚅','🚈','🚂','🚆','🚇','🚊','🚉','✈️','🛫','🛬','🛩️','💺','🛰️','🚀','🛸','🚁',
        '🛶','⛵','🚤','🛥️','🛳️','⛴️','🚢','⚓','⛽','🚧','🚦','🚥','🚏','🗺️','🗿',
        '🗽','🗼','🏰','🏯','🏟️','🎡','🎢','🎠','⛲','⛱️','🏖️','🏝️','🏜️','🌋','⛰️','🏔️',
        '🗻','🏕️','⛺','🏠','🏡','🏘️','🏚️','🏗️','🏭','🏢','🏬','🏣','🏤','🏥','🏦','🏨',
        '🏪','🏫','🏩','💒','🏛️','⛪','🕌','🕍','🛕','🕋','⛩️','🛤️','🛣️','🗾','🎑','🏞️',
        '🌅','🌄','🌠','🎇','🎆','🏙️','🌃','🌌','🌉','🌁','⌚',
        '🪈','🪇','🪊','🪋','🪌','🪍','🪎','🪏','🪐',
        '🏳️','🏴','🏴‍☠️','🏁','🚩','🏳️‍🌈',
        '🇺🇳','🇦🇫','🇦🇽','🇦🇱','🇩🇿','🇦🇸','🇦🇩','🇦🇴','🇦🇮','🇦🇶','🇦🇬','🇦🇷',
        '🇦🇲','🇦🇼','🇦🇺','🇦🇹','🇦🇿','🇧🇸','🇧🇭','🇧🇩','🇧🇧','🇧🇾','🇧🇪','🇧🇿','🇧🇯','🇧🇲','🇧🇹','🇧🇴',
        '🇧🇦','🇧🇼','🇧🇷','🇮🇴','🇻🇬','🇧🇳','🇧🇬','🇧🇫','🇧🇮','🇰🇭','🇨🇲','🇨🇦','🇮🇨','🇨🇻','🇧🇶','🇰🇾',
        '🇨🇫','🇹🇩','🇨🇱','🇨🇳','🇨🇽','🇨🇨','🇨🇴','🇰🇲','🇨🇬','🇨🇩','🇨🇰','🇨🇷','🇨🇮','🇭🇷','🇨🇺','🇨🇼',
        '🇨🇾','🇨🇿','🇩🇰','🇩🇯','🇩🇲','🇩🇴','🇪🇨','🇪🇬','🇸🇻','🇬🇶','🇪🇷','🇪🇪','🇪🇹','🇪🇺','🇫🇰','🇫🇴',
        '🇫🇯','🇫🇮','🇫🇷','🇬🇫','🇵🇫','🇹🇫','🇬🇦','🇬🇲','🇬🇪','🇩🇪','🇬🇭','🇬🇨','🇬🇷','🇬🇱','🇬🇩','🇬🇵','🇬🇺',
        '🇬🇹','🇬🇬','🇬🇳','🇬🇼','🇬🇾','🇭🇹','🇭🇳','🇭🇰','🇭🇺','🇮🇸','🇮🇳','🇮🇩','🇮🇷','🇮🇶','🇮🇪','🇮🇲',
        '🇮🇱','🇮🇹','🇯🇲','🇯🇵','🇯🇪','🇯🇴','🇰🇿','🇰🇪','🇰🇮','🇽🇰','🇰🇼','🇰🇬','🇱🇦','🇱🇻','🇱🇧','🇱🇸',
        '🇱🇷','🇱🇾','🇱🇮','🇱🇹','🇱🇺','🇲🇴','🇲🇬','🇲🇼','🇲🇾','🇲🇻','🇲🇱','🇲🇹','🇲🇭','🇲🇶','🇲🇷','🇲🇺',
        '🇾🇹','🇲🇽','🇫🇲','🇲🇩','🇲🇨','🇲🇳','🇲🇪','🇲🇸','🇲🇦','🇲🇿','🇲🇲','🇳🇦','🇳🇷','🇳🇵','🇳🇱','🇳🇨',
        '🇳🇿','🇳🇮','🇳🇪','🇳🇬','🇳🇺','🇳🇫','🇰🇵','🇲🇰','🇲🇵','🇳🇴','🇴🇲','🇵🇰','🇵🇼','🇵🇸','🇵🇦','🇵🇬',
        '🇵🇾','🇵🇪','🇵🇭','🇵🇳','🇵🇱','🇵🇹','🇵🇷','🇶🇦','🇷🇪','🇷🇴','🇷🇺','🇷🇼','🇼🇸','🇸🇲','🇸🇹','🇸🇦',
        '🇸🇳','🇷🇸','🇸🇨','🇸🇱','🇸🇬','🇸🇽','🇸🇰','🇸🇮','🇬🇸','🇸🇧','🇸🇴','🇿🇦','🇰🇷','🇸🇸','🇪🇸','🇱🇰',
        '🇧🇱','🇸🇭','🇰🇳','🇱🇨','🇵🇲','🇻🇨','🇸🇩','🇸🇷','🇸🇿','🇸🇪','🇨🇭','🇸🇾','🇹🇼','🇹🇯','🇹🇿','🇹🇭',
        '🇹🇱','🇹🇬','🇹🇰','🇹🇴','🇹🇹','🇹🇳','🇹🇷','🇹🇲','🇹🇨','🇹🇻','🇻🇮','🇺🇬','🇺🇦','🇦🇪','🇬🇧',
        '🇺🇸','🇺🇾','🇺🇿','🇻🇺','🇻🇦','🇻🇪','🇻🇳','🇼🇫','🇪🇭','🇾🇪','🇿🇲','🇿🇼'
    ];
    // 去重
    const seen = new Set();
    const unique = [];
    for (const e of allEmojis) {
        if (!seen.has(e)) { seen.add(e); unique.push(e); }
    }
    return unique;
})();

// 最近使用 emoji 常量
const EMOJI_RECENT = [];

let items = [];
let currentFilter = { tab: 'all', search: '' };
let selectedType = '效率';
let currentLayout = 'list';
let notebooks = [];
let currentNotebookId = 'default';
let deleteTargetId = null;
let renameTargetId = null;
let currentTheme = 'blue';

// 待办 checkbox 点击处理：完成状态随主题色变化
function handleTaskCheck(checkbox) {
    const div = checkbox.closest('div');
    if (checkbox.checked) {
        div.style.textDecoration = 'line-through';
        div.style.textDecorationColor = 'var(--theme-primary, #3B82F6)';
        div.style.opacity = '0.5';
        checkbox.style.accentColor = 'var(--theme-primary, #3B82F6)';
    } else {
        div.style.textDecoration = 'none';
        div.style.opacity = '1';
        checkbox.style.accentColor = '';
    }
}
let detailTargetId = null;
let detailTargetImgIdx = 0;
let _detailNeedsRerender = false; // 标记详情关闭后是否需要重新渲染（置顶/删除等操作）
let detailSelectedType = '';
let tags = [];
let timeSortMode = 0; // 0=不排序, 1=新→旧, 2=旧→新
let emojiPickerTarget = null;
let currentEmoji = '💡';
let detailEmoji = '💡';
let newTagEmoji = '🏷️';
let tagScrollTimer = null;
let emojiRecent = []; // 最近使用的 emoji
let inlineTagEmoji = '🏷️'; // 内联新增分类的 emoji

let editTagEmoji = '🏷️';
let editTagId = null;
// 显示分类数量：启动时从 localStorage 读取上次状态（默认 false）
let showTagCount = (function() {
    try { return localStorage.getItem('gator_show_tag_count') === 'true'; }
    catch(e) { return false; }
})();
let currentFullscreenItem = null; // 全屏预览模式下当前 item
let fullscreenTypePickerTarget = null; // 当前分类选择器的目标
// 首页灵感预览模式：启动时从 localStorage 读取上次状态（默认 true）
let imagePreviewMode = (function() {
    try {
        const v = localStorage.getItem('gator_image_preview_mode');
        return v === null ? true : v === 'true';
    } catch(e) { return true; }
})();
let detailOriginalTitle = '';
let detailOriginalContent = '';
let detailOriginalEmoji = '';
// 滚动位置记忆：{ itemId: { previewScroll: number, editorScroll: number, timestamp: number } }
const scrollPositionCache = {};

// 动态注入卡片 hover CSS（核心样式已在 HTML <style> 中，这里只补充 cursor）
function injectCardHoverCSS() {
    if (document.getElementById('card-hover-styles')) return;
    const style = document.createElement('style');
    style.id = 'card-hover-styles';
    style.textContent = `
        .card-wrapper { cursor: pointer; }
    `;
    document.head.appendChild(style);
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    // 禁用浏览器滚动恢复，手动控制滚动位置
    history.scrollRestoration = 'manual';
    loadEmojiRecent();
    loadTags();
    // 确保"未分类"tag存在（系统预设，不可编辑/删除/排序）
    if (!tags.find(t => t.name === '未分类')) {
        tags.push({ id: 'tag_uncategorized_default', name: '未分类', emoji: '📋', editable: false, deletable: false, system: true });
        saveTags();
    } else {
        // 修复已有未分类tag的属性为系统预设
        const uc = tags.find(t => t.name === '未分类');
        if (uc) { uc.editable = false; uc.deletable = false; uc.system = true; saveTags(); }
    }
    loadNotebooks();
    loadItems();
    loadSettings();

    // 恢复自定义颜色
    const customColor = localStorage.getItem('gator_custom_color');
    if (customColor && currentTheme === 'custom') {
        applyCustomColor(customColor, false);
    }
    applyTheme(currentTheme, false);
    injectCardHoverCSS();
    renderFeed(false, true);
    window.scrollTo(0, 0);
    renderTabBar();
    updateNotebookNameDisplay();
    initBannerScroll();
    initBannerHoverPause();
    initMarkdownEditor();
    // 恢复自动轮换
    if (localStorage.getItem('gator_auto_theme') === 'true') {
        startAutoThemeTimer();
    }
    // 窗口大小变化时重新布局瀑布流
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (currentLayout === 'masonry') {
                layoutMasonry(document.getElementById('feedContainer'));
            }
        }, 150);
    });
});

// ===== 最近使用 emoji =====
function loadEmojiRecent() {
    try {
        const stored = localStorage.getItem(EMOJI_RECENT_KEY);
        if (stored) emojiRecent = JSON.parse(stored);
        else emojiRecent = [];
    } catch (e) { emojiRecent = []; }
}
function saveEmojiRecent() {
    localStorage.setItem(EMOJI_RECENT_KEY, JSON.stringify(emojiRecent));
}

function loadTags() {
    try {
        const stored = localStorage.getItem(TAGS_KEY);
        if (stored) tags = JSON.parse(stored);
        else { tags = JSON.parse(JSON.stringify(DEFAULT_TAGS)); saveTags(); }
    } catch (e) { tags = JSON.parse(JSON.stringify(DEFAULT_TAGS)); }
}
function saveTags() { localStorage.setItem(TAGS_KEY, JSON.stringify(tags)); }

function loadSettings() {
    const savedBg = localStorage.getItem(BG_COLOR_KEY);
    if (savedBg) document.body.style.setProperty('--app-bg', savedBg);
    const savedLayout = localStorage.getItem(LAYOUT_KEY);
    if (savedLayout) { currentLayout = savedLayout; updateLayoutIcon(); }
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme && THEMES[savedTheme]) currentTheme = savedTheme;
    const savedSort = localStorage.getItem('gator_time_sort');
    if (savedSort) timeSortMode = parseInt(savedSort) || 0;
    // 带图预览 & 分类数量：强制从 localStorage 同步最新状态（双保险）
    try {
        const savedTagCount = localStorage.getItem('gator_show_tag_count');
        showTagCount = savedTagCount === 'true';
    } catch(e) {}
    try {
        const savedImagePreview = localStorage.getItem('gator_image_preview_mode');
        imagePreviewMode = savedImagePreview === null ? true : savedImagePreview === 'true';
    } catch(e) {}
}

// ===== 主题色管理 =====
function applyTheme(themeName, save = true) {
    const theme = THEMES[themeName] || THEMES.blue;
    currentTheme = themeName;
    document.documentElement.style.setProperty('--theme-primary', theme.primary);
    document.documentElement.style.setProperty('--theme-primary-dark', theme.primaryDark);
    document.documentElement.style.setProperty('--theme-primary-light', theme.primaryLight);
    document.documentElement.style.setProperty('--theme-primary-faint', theme.primaryFaint);
    document.documentElement.style.setProperty('--theme-complementary-faint', theme.complementaryFaint || '#F3F4F6');
    document.documentElement.style.setProperty('--theme-complementary-light', theme.complementaryLight || '#E5E7EB');
    document.documentElement.style.setProperty('--theme-complementary-dark', theme.complementaryDark || '#374151');
    document.documentElement.style.setProperty('--brand-dark', theme.primary);
    document.documentElement.style.setProperty('--brand-deeper', theme.primaryDark);
    document.documentElement.style.setProperty('--brand-light', theme.primaryLight);
    document.documentElement.style.setProperty('--brand-faint', theme.primaryFaint);
    document.documentElement.style.setProperty('--app-bg', theme.bg);
    document.body.style.background = theme.bg;
    // 更新吸顶区域背景
    const stickyHeader = document.querySelector('.sticky.top-0');
    if (stickyHeader) stickyHeader.style.background = theme.bg;
    const wc = document.querySelector('.welcome-gradient');
    if (wc) wc.style.background = theme.gradient;
    const b2 = document.getElementById('banner2Card');
    if (b2) b2.style.background = theme.complementary;
    document.querySelectorAll('.fab-pulse').forEach(b => b.style.background = theme.primary);
    document.documentElement.style.setProperty('--fab-glow', theme.primary + '66');
    document.documentElement.style.setProperty('--search-glow', '0 0 0 6px ' + theme.primary + '18, 0 0 30px ' + theme.primary + '14, 0 0 80px ' + theme.primary + '0a, 0 0 120px ' + theme.primary + '06');
    document.querySelectorAll('.text-brand-dark').forEach(el => el.style.color = theme.primary);
    document.querySelectorAll('.bg-brand-dark').forEach(el => el.style.backgroundColor = theme.primary);
    document.querySelectorAll('.bg-brand-light').forEach(el => el.style.backgroundColor = theme.primaryLight);
    document.querySelectorAll('.text-brand-deeper').forEach(el => el.style.color = theme.primaryDark);
    document.querySelectorAll('.bg-brand-faint').forEach(el => el.style.backgroundColor = theme.primaryFaint);
    renderTabBar();
    updateTimeSortBtn();
    updateTypeButtons();
    updateDetailTypeButtons();
    updateTimeSortBtn();
    if (save) localStorage.setItem(THEME_KEY, themeName);
    forceRedraw();
}

function forceRedraw() {
    document.querySelectorAll('[style*="--theme-primary"]').forEach(el => {
        const display = el.style.display;
        el.style.display = 'none';
        requestAnimationFrame(() => {
            el.style.display = display;
        });
    });
}

// ===== 自定义颜色 =====
// 中国传统色色板（20色 + 1自定义入口 = 21格，5列）
const CUSTOM_PALETTE = [
    { hex: '#FF4E20', name: '丹' },
    { hex: '#CB3A56', name: '茜' },
    { hex: '#DB5A6B', name: '海棠' },
    { hex: '#F47983', name: '桃红' },
    { hex: '#B36D61', name: '檀' },
    { hex: '#FBBF24', name: '缃叶' },
    { hex: '#D97706', name: '琥珀' },
    { hex: '#C9DD22', name: '柳黄' },
    { hex: '#96CE54', name: '豆青' },
    { hex: '#00E079', name: '青翠' },
    { hex: '#70F3FF', name: '蔚蓝' },
    { hex: '#177CB0', name: '靛青' },
    { hex: '#065279', name: '靛蓝' },
    { hex: '#4B5CC4', name: '宝蓝' },
    { hex: '#801DAE', name: '青莲' },
    { hex: '#B0A4E3', name: '雪青' },
    { hex: '#56004F', name: '紫棠' },
    { hex: '#4C221B', name: '紫檀' },
    { hex: '#F2ECDE', name: '缟' },
    { hex: 'custom', name: '自选' },
];

let selectedCustomColor = '#3B82F6';

function openCustomColorPanel() {
    const theme = THEMES[currentTheme] || THEMES.blue;
    selectedCustomColor = theme.primary;
    // 生成色板网格（5列）
    const grid = document.getElementById('customColorGrid');
    grid.innerHTML = CUSTOM_PALETTE.map(c => {
        if (c.hex === 'custom') {
            return `<button onclick="openNativeColorPicker()" class="custom-color-swatch w-full aspect-square rounded-xl flex items-center justify-center btn-press transition-all duration-150" data-color="custom" style="background: conic-gradient(from 0deg, #f87171, #fbbf24, #34d399, #60a5fa, #a78bfa, #f472b6, #f87171);">
                <div class="w-[60%] h-[60%] rounded-lg bg-white flex items-center justify-center">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                </div>
            </button>`;
        }
        return `<button onclick="selectCustomColor('${c.hex}', '${c.name}')" class="custom-color-swatch w-full aspect-square rounded-xl transition-all duration-150 btn-press" style="background:${c.hex};" data-color="${c.hex}" data-name="${c.name}"></button>`;
    }).join('');
    // 半屏面板缩小隐藏
    const halfPanel = document.getElementById('bgColorPanel');
    halfPanel.style.transform = 'translateY(100%)';
    halfPanel.style.opacity = '0';
    // 自定义面板从底部弹出
    const panel = document.getElementById('customColorPanel');
    panel.style.display = '';
    panel.style.height = 'auto';
    panel.style.opacity = '1';
    panel.style.overflow = 'visible';
    panel.style.visibility = '';
    // 初始化标题和按钮
    updateCustomColorDisplay('丹', theme.primary);
    highlightCustomSwatch();
}

function openNativeColorPicker() {
    const input = document.createElement('input');
    input.type = 'color';
    input.value = selectedCustomColor;
    input.style.position = 'absolute';
    input.style.opacity = '0';
    input.style.width = '0';
    input.style.height = '0';
    document.body.appendChild(input);
    input.addEventListener('input', (e) => {
        selectedCustomColor = e.target.value;
        updateCustomColorDisplay('自选', selectedCustomColor);
        highlightCustomSwatch();
    });
    input.addEventListener('change', () => {
        document.body.removeChild(input);
    });
    input.click();
}

function selectCustomColor(hex, name) {
    selectedCustomColor = hex;
    updateCustomColorDisplay(name || '自选', hex);
    highlightCustomSwatch();
}

function updateCustomColorDisplay(name, hex) {
    const nameEl = document.getElementById('customColorName');
    const btn = document.getElementById('customColorConfirmBtn');
    if (nameEl) {
        nameEl.textContent = name;
        nameEl.style.color = hex;
    }
    if (btn) btn.style.background = hex;
}

function highlightCustomSwatch() {
    document.querySelectorAll('.custom-color-swatch').forEach(s => {
        if (s.dataset.color === selectedCustomColor) {
            s.style.outline = '2.5px solid #1F2937';
            s.style.outlineOffset = '-1px';
            s.style.transform = 'scale(1.15)';
        } else {
            s.style.outline = '';
            s.style.outlineOffset = '';
            s.style.transform = '';
        }
    });
}

function closeCustomColorPanel() {
    const panel = document.getElementById('customColorPanel');
    const halfPanel = document.getElementById('bgColorPanel');
    // 隐藏自定义面板
    panel.style.display = 'none';
    panel.style.height = '0';
    panel.style.overflow = 'hidden';
    panel.style.opacity = '0';
    // 恢复半屏面板（带动画）
    halfPanel.style.transition = 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s ease';
    halfPanel.style.transform = 'translateY(0)';
    halfPanel.style.opacity = '1';
    setTimeout(() => {
        halfPanel.style.transition = '';
    }, 300);
}

function previewCustomColor(hex) {
    document.getElementById('customColorConfirmBtn').style.background = hex;
}

function confirmCustomColor() {
    // 如果自动轮换开着，关闭它
    const wasAutoTheme = localStorage.getItem('gator_auto_theme') === 'true';
    if (wasAutoTheme) {
        localStorage.removeItem('gator_auto_theme');
        localStorage.removeItem('gator_auto_theme_start');
        if (autoThemeTimer) { clearInterval(autoThemeTimer); autoThemeTimer = null; }
    }
    applyCustomColor(selectedCustomColor, false);
    closeCustomColorPanel();
    closeBgColorModal();
    showFabCheckmark();
    if (wasAutoTheme) {
        showToast('自定义颜色已应用，自动轮换已关闭');
    } else {
        showToast('自定义颜色已应用');
    }
}

function applyCustomColor(hex, close = true) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);

    // 计算感知亮度（0-255）
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    const isLight = luminance > 180;

    // 如果颜色太浅，加深主色确保白色文字可读
    let adjustedR = r, adjustedG = g, adjustedB = b;
    if (isLight) {
        const factor = 0.65;
        adjustedR = Math.round(r * factor);
        adjustedG = Math.round(g * factor);
        adjustedB = Math.round(b * factor);
    }

    const darken = (v) => Math.max(0, Math.round(v * 0.75));
    const lighten = (v) => Math.min(255, Math.round(v + (255 - v) * 0.85));
    const fainten = (v) => Math.min(255, Math.round(v + (255 - v) * 0.94));

    const primary = isLight ? `#${adjustedR.toString(16).padStart(2,'0')}${adjustedG.toString(16).padStart(2,'0')}${adjustedB.toString(16).padStart(2,'0')}` : hex;
    const primaryDark = `#${darken(adjustedR).toString(16).padStart(2,'0')}${darken(adjustedG).toString(16).padStart(2,'0')}${darken(adjustedB).toString(16).padStart(2,'0')}`;
    const primaryLight = `#${lighten(r).toString(16).padStart(2,'0')}${lighten(g).toString(16).padStart(2,'0')}${lighten(b).toString(16).padStart(2,'0')}`;
    const primaryFaint = `#${fainten(r).toString(16).padStart(2,'0')}${fainten(g).toString(16).padStart(2,'0')}${fainten(b).toString(16).padStart(2,'0')}`;

    const compR = 255 - r, compG = 255 - g, compB = 255 - b;
    const compDark = (v) => Math.max(0, Math.round(v * 0.85));
    const complementary = `linear-gradient(135deg, rgb(${compR},${compG},${compB}) 0%, rgb(${compDark(compR)},${compDark(compG)},${compDark(compB)}) 100%)`;
    const complementaryFaint = `#${fainten(compR).toString(16).padStart(2,'0')}${fainten(compG).toString(16).padStart(2,'0')}${fainten(compB).toString(16).padStart(2,'0')}`;
    const complementaryLight = `#${lighten(compR).toString(16).padStart(2,'0')}${lighten(compG).toString(16).padStart(2,'0')}${lighten(compB).toString(16).padStart(2,'0')}`;
    const complementaryDark = `#${compDark(compR).toString(16).padStart(2,'0')}${compDark(compG).toString(16).padStart(2,'0')}${compDark(compB).toString(16).padStart(2,'0')}`;

    THEMES.custom = {
        primary, primaryDark, primaryLight, primaryFaint,
        bg: primaryFaint,
        gradient: `linear-gradient(135deg, ${primary} 0%, ${primaryDark} 100%)`,
        complementary,
        complementaryFaint, complementaryLight, complementaryDark,
        isLight
    };

    applyTheme('custom');
    localStorage.setItem('gator_theme', 'custom');
    localStorage.setItem('gator_custom_color', hex);
    if (close) {
        closeBgColorModal();
        if (isLight) {
            showToast('已应用自定义颜色，已自动加深保证可读性');
        } else {
            showToast('已应用自定义颜色');
        }
    }

}

let autoThemeTimer = null;

function toggleAutoTheme() {
    const isOn = localStorage.getItem('gator_auto_theme') === 'true';
    if (isOn) {
        // 关闭
        localStorage.removeItem('gator_auto_theme');
        localStorage.removeItem('gator_auto_theme_start');
        if (autoThemeTimer) { clearInterval(autoThemeTimer); autoThemeTimer = null; }
        showToast('已关闭自动轮换');
    } else {
        // 开启
        localStorage.setItem('gator_auto_theme', 'true');
        localStorage.setItem('gator_auto_theme_start', Date.now().toString());
        startAutoThemeTimer();
        showToast('已开启自动轮换，每 12 小时更换');
    }
    updateAutoThemeBtn();
    closeBgColorModal();
    showFabCheckmark();
}

function startAutoThemeTimer() {
    if (autoThemeTimer) clearInterval(autoThemeTimer);
    // 计算距离下一次 12 小时还有多久
    const start = parseInt(localStorage.getItem('gator_auto_theme_start') || '0');
    const elapsed = Date.now() - start;
    const interval = 12 * 60 * 60 * 1000; // 12 小时
    const nextDelay = elapsed >= interval ? 0 : (interval - elapsed);

    // 先检查是否已经过了第一个 12 小时
    if (elapsed >= interval) {
        applyRandomTheme();
        localStorage.setItem('gator_auto_theme_start', Date.now().toString());
    }

    autoThemeTimer = setInterval(() => {
        applyRandomTheme();
        localStorage.setItem('gator_auto_theme_start', Date.now().toString());
    }, interval);
}

function applyRandomTheme() {
    const themeKeys = Object.keys(THEMES);
    const current = currentTheme;
    // 随机选一个不同的主题
    let next;
    do { next = themeKeys[Math.floor(Math.random() * themeKeys.length)]; } while (next === current && themeKeys.length > 1);
    applyTheme(next);
    localStorage.setItem('gator_theme', next);
}

function updateAutoThemeBtn() {
    const btn = document.getElementById('autoThemeBtn');
    const icon = document.getElementById('autoThemeIcon');
    const text = document.getElementById('autoThemeText');
    if (!btn) return;
    const isOn = localStorage.getItem('gator_auto_theme') === 'true';
    const theme = THEMES[currentTheme] || THEMES.blue;
    if (isOn) {
        btn.style.background = theme.primaryLight;
        btn.style.color = theme.primaryDark;
        text.textContent = '自动轮换中';
        if (icon) icon.style.transform = 'rotate(0deg)';
    } else {
        btn.style.background = '';
        btn.style.color = '';
        text.textContent = '自动轮换';
        if (icon) icon.style.transform = '';
    }
}

function getContrastColor(hex) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#1F2937' : '#FFFFFF';
}

function updateThemeColorSelection() {
    const theme = THEMES[currentTheme] || THEMES.blue;
    document.querySelectorAll('.theme-color-btn').forEach(btn => {
        // 移除旧的选中标记
        const old = btn.querySelector('.theme-check');
        if (old) old.remove();
        btn.style.outline = '';

        if (btn.dataset.theme === currentTheme) {
            // 添加强调色选中框
            btn.style.outline = `2.5px solid ${theme.primaryDark}`;
            btn.style.outlineOffset = '-2.5px';
            // 添加对勾（使用背景色的对比色）
            const bg = getComputedStyle(btn).backgroundColor;
            const rgb = bg.match(/\d+/g);
            const hex = rgb ? '#' + rgb.slice(0,3).map(v => parseInt(v).toString(16).padStart(2,'0')).join('') : '#DBEAFE';
            const contrast = getContrastColor(hex);
            const check = document.createElement('div');
            check.className = 'theme-check absolute inset-0 flex items-center justify-center';
            check.innerHTML = `<svg class="w-5 h-5 drop-shadow-sm" fill="none" stroke="${contrast}" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`;
            btn.appendChild(check);
        }
    });
}

function setThemeColor(themeName) {
    applyTheme(themeName);
    closeBgColorModal();
    showFabCheckmark();
    showToast('主题颜色已更改');
}

// ===== 标签栏渲染（全部固定左侧，其余可滚动，齿轮固定右侧）=====
function renderTabBar() {
    const theme = THEMES[currentTheme] || THEMES.blue;
    const scrollArea = document.getElementById('tagScrollArea');
    if (!scrollArea) return;

    // 更新"全部"按钮样式和文字
    const allBtn = document.querySelector('.tab-btn[data-tab="all"]');
    if (allBtn) {
        const allCount = showTagCount ? items.length : 0;
        const allCountStr = showTagCount && allCount > 0 ? ` ${allCount}` : '';
        allBtn.textContent = `全部${allCountStr}`;
        if (currentFilter.tab === 'all') {
            allBtn.style.backgroundColor = theme.primary;
            allBtn.style.color = '#fff';
        } else {
            allBtn.style.backgroundColor = theme.primaryLight;
            allBtn.style.color = theme.primaryDark;
        }
    }

    // 渲染滚动区域内的 tag 按钮（排除"全部"，未分类优先显示，无灵感时隐藏）
    scrollArea.innerHTML = '';
    const sortedTags = tags.filter(t => t.id !== 'all').sort((a, b) => {
        if (a.system) return -1;  // 系统预设（未分类）排最前
        if (b.system) return 1;
        return 0;
    });
    sortedTags.forEach(tag => {
        // 未分类：无灵感时隐藏
        if (tag.system && items.filter(i => i.type === tag.name).length === 0) return;
        const btn = document.createElement('button');
        btn.className = 'tab-btn px-4 py-2 rounded-full text-[14px] whitespace-nowrap transition flex-shrink-0';
        btn.dataset.tab = tag.id;
        btn.onclick = () => filterByTab(tag.id);
        // 分类数量
        const count = showTagCount ? items.filter(i => i.type === tag.name).length : 0;
        const countStr = showTagCount && count > 0 ? ` ${count}` : '';
        btn.textContent = tag.emoji ? `${tag.emoji} ${tag.name}${countStr}` : `${tag.name}${countStr}`;

        if (tag.id === currentFilter.tab) {
            btn.classList.add('font-medium');
            btn.style.backgroundColor = theme.primary;
            btn.style.color = '#fff';
        } else {
            btn.style.backgroundColor = theme.primaryLight;
            btn.style.color = theme.primaryDark;
        }
        scrollArea.appendChild(btn);
    });
}

// ===== 未分类清空检测 =====
// 当未分类下最后一个灵感被删除或移走时，自动跳转全部并提示
function checkUncategorizedEmpty() {
    const ucTag = tags.find(t => t.name === '未分类');
    if (!ucTag) return false;
    const ucCount = items.filter(i => i.type === '未分类').length;
    if (ucCount === 0 && currentFilter.tab === ucTag.id) {
        currentFilter.tab = 'all';
        renderTabBar();
        renderFeed();
        showFabCheckmark();
        showToast('已全部完成分类');
        return true;
    }
    // 即使不在未分类页，也要刷新分类栏（隐藏未分类标签）
    if (ucCount === 0) {
        renderTabBar();
    }
    return false;
}

// ===== 标签滚动指示器（根据 scrollLeft 和 scrollWidth 计算进度条宽度）=====
function showTagScrollIndicator() {
    const indicator = document.getElementById('tagScrollIndicator');
    const scrollArea = document.getElementById('tagScrollArea');
    if (!indicator || !scrollArea) return;

    const scrollLeft = scrollArea.scrollLeft;
    const scrollWidth = scrollArea.scrollWidth;
    const clientWidth = scrollArea.clientWidth;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) { indicator.style.opacity = '0'; return; }

    // 计算滚动进度百分比，指示器宽度 = (可见区域 / 总宽度) * 100%
    const viewRatio = clientWidth / scrollWidth;
    const indicatorWidth = Math.max(viewRatio * 100, 20); // 最小 20%
    // 计算指示器偏移
    const scrollRatio = scrollLeft / maxScroll;
    const maxOffset = 100 - indicatorWidth;
    const indicatorOffset = scrollRatio * maxOffset;

    indicator.style.width = indicatorWidth + '%';
    indicator.style.marginLeft = indicatorOffset + '%';
    indicator.style.opacity = '1';
    clearTimeout(tagScrollTimer);
    tagScrollTimer = setTimeout(() => {
        indicator.style.opacity = '0';
    }, 1000);
}

// ===== 笔记簿管理 =====
function loadNotebooks() {
    try {
        const stored = localStorage.getItem(NOTEBOOKS_KEY);
        if (stored) notebooks = JSON.parse(stored);
        else { notebooks = [{ id: 'default', name: '默认笔记簿', createdAt: new Date().toISOString() }]; saveNotebooks(); }
    } catch (e) { notebooks = [{ id: 'default', name: '默认笔记簿', createdAt: new Date().toISOString() }]; }
    const savedCurrent = localStorage.getItem(CURRENT_NOTEBOOK_KEY);
    if (savedCurrent) currentNotebookId = savedCurrent;
}
function saveNotebooks() {
    localStorage.setItem(NOTEBOOKS_KEY, JSON.stringify(notebooks));
    localStorage.setItem(CURRENT_NOTEBOOK_KEY, currentNotebookId);
}
function getCurrentNotebookName() {
    const nb = notebooks.find(n => n.id === currentNotebookId);
    return nb ? nb.name : '默认笔记簿';
}
function updateNotebookNameDisplay() {
    const el = document.getElementById('currentNotebookName');
    if (el) el.textContent = getCurrentNotebookName();
}
function toggleNotebookMenu() {
    const m = document.getElementById('notebookMenuModal');
    if (m.classList.contains('hidden')) { renderNotebookList(); m.classList.remove('hidden'); }
    else m.classList.add('hidden');
}
function closeNotebookMenu() { document.getElementById('notebookMenuModal').classList.add('hidden'); showFabCheckmark(); }

function renderNotebookList() {
    const list = document.getElementById('notebookList');
    const theme = THEMES[currentTheme] || THEMES.blue;
    list.innerHTML = notebooks.map(nb => {
        const isActive = nb.id === currentNotebookId;
        const isDefault = nb.id === 'default';
        // 图标背景跟随主题色
        const iconBg = isActive ? theme.primary : theme.primaryLight;
        const iconColor = isActive ? '#fff' : theme.primaryDark;
        const nameColor = isActive ? theme.primary : '#111827';
        return `<div class="flex items-center justify-between px-4 py-3 transition cursor-pointer" style="background: ${isActive ? theme.primaryFaint : 'transparent'}" onclick="switchNotebook('${nb.id}')">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background: ${iconBg}">
                    <svg class="w-4 h-4" style="color: ${iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </div>
                <div>
                    <p class="text-[14px] font-medium" style="color: ${nameColor}">${escapeHtml(nb.name)}</p>
                    <p class="text-[11px] text-gray-400">${getNotebookItemCount(nb.id)} 条灵感</p>
                </div>
            </div>
            <div class="flex items-center gap-1">
                ${isActive ? `<span class="text-[12px] font-medium mr-1" style="color: ${theme.primary}">当前</span>` : ''}
                <button onclick="event.stopPropagation(); showRenameNotebookModal('${nb.id}')" class="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition btn-press">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </button>
                ${!isDefault ? `<button onclick="event.stopPropagation(); showDeleteNotebookModal('${nb.id}')" class="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition btn-press">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>` : ''}
            </div>
        </div>`;
    }).join('');
}
function getNotebookItemCount(id) {
    try { const s = localStorage.getItem(STORAGE_KEY + '_' + id); return s ? JSON.parse(s).length : 0; } catch(e) { return 0; }
}
function switchNotebook(id) {
    currentNotebookId = id; saveNotebooks(); loadItems(); renderFeed(); updateNotebookNameDisplay();
    closeNotebookMenu(); showFabCheckmark(); showToast('已切换到 ' + getCurrentNotebookName());
}

let deleteNotebookTargetId = null;
function showDeleteNotebookModal(id) {
    deleteNotebookTargetId = id;
    const nb = notebooks.find(n => n.id === id);
    if (!nb) return;
    document.getElementById('deleteNotebookName').textContent = nb.name;
    document.getElementById('deleteNotebookModal').classList.remove('hidden');
}
function closeDeleteNotebookModal() { document.getElementById('deleteNotebookModal').classList.add('hidden'); deleteNotebookTargetId = null; }
function confirmDeleteNotebook() {
    if (!deleteNotebookTargetId) { closeDeleteNotebookModal(); return; }
    const nb = notebooks.find(n => n.id === deleteNotebookTargetId);
    if (nb && nb.id !== 'default') {
        localStorage.removeItem(STORAGE_KEY + '_' + deleteNotebookTargetId);
        notebooks = notebooks.filter(n => n.id !== deleteNotebookTargetId);
        saveNotebooks();
        if (currentNotebookId === deleteNotebookTargetId) {
            currentNotebookId = 'default'; saveNotebooks(); loadItems(); renderFeed(); updateNotebookNameDisplay();
        }
        renderNotebookList();
        showToast('笔记簿已删除');
    }
    closeDeleteNotebookModal();
}

function showCreateNotebookModal() {
    closeNotebookMenu();
    document.getElementById('createNotebookModal').classList.remove('hidden');
    document.getElementById('newNotebookName').value = '';
    setTimeout(() => document.getElementById('newNotebookName').focus(), 100);
}
function closeCreateNotebookModal() { document.getElementById('createNotebookModal').classList.add('hidden'); }
function createNotebook() {
    const name = document.getElementById('newNotebookName').value.trim();
    if (!name) { showToast('请输入笔记簿名称'); return; }
    const newId = 'nb_' + Date.now();
    notebooks.push({ id: newId, name, createdAt: new Date().toISOString() });
    saveNotebooks(); closeCreateNotebookModal();
    switchNotebook(newId);
    showFabCheckmark();
    showToast('笔记簿创建成功');
}
function showRenameNotebookModal(id) {
    renameTargetId = id;
    const nb = notebooks.find(n => n.id === id);
    if (!nb) return;
    document.getElementById('renameNotebookInput').value = nb.name;
    document.getElementById('renameNotebookModal').classList.remove('hidden');
    setTimeout(() => document.getElementById('renameNotebookInput').focus(), 100);
}
function closeRenameNotebookModal() { document.getElementById('renameNotebookModal').classList.add('hidden'); renameTargetId = null; }
function confirmRenameNotebook() {
    const n = document.getElementById('renameNotebookInput').value.trim();
    if (!n) { showToast('请输入新名称'); return; }
    const nb = notebooks.find(x => x.id === renameTargetId);
    if (nb) { nb.name = n; saveNotebooks(); updateNotebookNameDisplay(); renderNotebookList(); showToast('重命名成功'); }
    closeRenameNotebookModal();
}

// ===== 数据管理 =====
function getStorageKey() { return STORAGE_KEY + '_' + currentNotebookId; }
function loadItems() { try { const s = localStorage.getItem(getStorageKey()); items = s ? JSON.parse(s) : []; } catch(e) { items = []; } }
function saveItems() { localStorage.setItem(getStorageKey(), JSON.stringify(items)); }

// ===== 背景颜色 =====
function toggleBgColor() {
    document.getElementById('bgColorModal').classList.remove('hidden');
    updateAutoThemeBtn();
    updateThemeColorSelection();
}
function closeBgColorModal() {
    document.getElementById('bgColorModal').classList.add('hidden');
    // 重置面板状态
    const halfPanel = document.getElementById('bgColorPanel');
    halfPanel.style.transform = '';
    halfPanel.style.opacity = '';
    const customPanel = document.getElementById('customColorPanel');
    customPanel.style.height = '0';
    customPanel.style.opacity = '0';
    customPanel.style.overflow = 'hidden';
    showFabCheckmark();
}

// ===== 布局切换 =====
let isAnimatingLayout = false;
function toggleLayout() {
    if (isAnimatingLayout) return;
    isAnimatingLayout = true;
    currentLayout = currentLayout === 'list' ? 'masonry' : 'list';
    localStorage.setItem(LAYOUT_KEY, currentLayout);
    const icon = document.getElementById('layoutIcon');
    icon.style.transform = 'rotate(180deg) scale(0.8)'; icon.style.opacity = '0.5';
    const container = document.getElementById('feedContainer');
    // 淡出
    container.style.transition = 'opacity 0.3s ease';
    container.style.opacity = '0';
    setTimeout(() => {
        updateLayoutIcon();
        icon.style.transform = 'rotate(0deg) scale(1)'; icon.style.opacity = '1';
        renderFeed();
        showFabLayoutIcon();
        showToast(currentLayout === 'masonry' ? '已切换为瀑布流' : '已切换为卡片流');
        requestAnimationFrame(() => {
            container.style.transition = 'opacity 0.3s ease';
            container.style.opacity = '1';
            setTimeout(() => { isAnimatingLayout = false; }, 300);
        });
    }, 150);
}
function updateLayoutIcon() {
    const icon = document.getElementById('layoutIcon');
    icon.innerHTML = currentLayout === 'list'
        ? '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>'
        : '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>';
}

// ===== 标签筛选 =====
function filterByTab(tab) {
    currentFilter.tab = tab;
    renderTabBar();
    renderFeed();
    // 滚动标签到可视区域中央
    setTimeout(() => {
        const scrollArea = document.getElementById('tagScrollArea');
        if (!scrollArea) return;
        if (tab === 'all') {
            scrollArea.scrollTo({ left: 0, behavior: 'smooth' });
            return;
        }
        const btn = scrollArea.querySelector(`[data-tab="${tab}"]`);
        if (btn) {
            const areaRect = scrollArea.getBoundingClientRect();
            const btnRect = btn.getBoundingClientRect();
            const scrollLeft = btnRect.left - areaRect.left + scrollArea.scrollLeft - (areaRect.width / 2) + (btnRect.width / 2);
            scrollArea.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
        }
    }, 50);
}

// ===== 搜索 =====
function handleSearch() { currentFilter.search = document.getElementById('searchInput').value.trim(); renderFeed(); }

// 搜索框 focus 泛光效果（使用 inline style 确保不受 Tailwind CSS 变量系统覆盖）
function applySearchFocus() {
    const input = document.getElementById('searchInput');
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--theme-primary').trim();
    const glow = getComputedStyle(document.documentElement).getPropertyValue('--search-glow').trim();
    input.style.borderColor = primary || '#F59E0B';
    input.style.boxShadow = glow || '0 0 0 6px rgba(245,158,11,0.09), 0 0 30px rgba(245,158,11,0.08), 0 0 80px rgba(245,158,11,0.04), 0 0 120px rgba(245,158,11,0.02)';
    input.style.outline = 'none';
}
function removeSearchFocus() {
    const input = document.getElementById('searchInput');
    input.style.borderColor = '';
    input.style.boxShadow = '';
    input.style.outline = '';
}

// ===== 渲染 =====
// 小红书风格瀑布流布局算法
function layoutMasonry(container) {
    const cards = container.querySelectorAll('.card-wrapper');
    if (!cards.length) return;
    const gap = 10;
    const containerWidth = container.offsetWidth;
    if (containerWidth <= 0) return;
    const colWidth = (containerWidth - gap) / 2;
    const colHeights = [0, 0];
    cards.forEach(card => {
        card.style.transform = '';
        card.style.transition = 'none';
        // 使用 setProperty + important 覆盖 CSS 中的 position: relative !important
        card.style.setProperty('position', 'absolute', 'important');
        card.style.width = colWidth + 'px';
    });
    void container.offsetHeight;
    cards.forEach(card => {
        const cardHeight = card.offsetHeight;
        const col = colHeights[0] <= colHeights[1] ? 0 : 1;
        const x = col * (colWidth + gap);
        const y = colHeights[col];
        card.style.transform = `translate(${x}px, ${y}px)`;
        colHeights[col] += cardHeight + gap;
    });
    container.style.height = Math.max(colHeights[0], colHeights[1]) + 'px';
}

function renderFeed(keepScroll, scrollToTop) {
    const container = document.getElementById('feedContainer');
    const emptyState = document.getElementById('emptyState');

    // FLIP 动画：记录所有卡片旧位置
    const oldRects = {};
    if (keepScroll) {
        container.querySelectorAll('.card-wrapper').forEach(el => {
            const id = el.dataset.id;
            if (id) oldRects[id] = el.getBoundingClientRect();
        });
    }

    // 保存滚动位置，重建后恢复
    const savedScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

    let filtered = items.filter(item => {
        if (currentFilter.tab !== 'all') {
            const tag = tags.find(t => t.id === currentFilter.tab);
            if (tag && item.type !== tag.name) return false;
        }
        if (currentFilter.search) {
            const s = currentFilter.search.toLowerCase();
            return (item.title && item.title.toLowerCase().includes(s)) || item.content.toLowerCase().includes(s);
        }
        return true;
    });

    // pinned 的灵感始终排在最前面
    filtered.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
    });

    // 时间排序三态
    // pinned 区内排序键 = max(pinnedAt, updatedAt) —— 「编辑」和「置顶」哪个最后发生，哪个决定位置
    if (timeSortMode === 2) {
        // 按时间旧→新
        const pinned = filtered.filter(i => i.pinned).sort((a, b) => {
            const aKey = Math.max(a.pinnedAt || 0, new Date(a.updatedAt || a.createdAt).getTime());
            const bKey = Math.max(b.pinnedAt || 0, new Date(b.updatedAt || b.createdAt).getTime());
            return aKey - bKey;
        });
        const unpinned = filtered.filter(i => !i.pinned);
        unpinned.sort((a, b) => new Date(a.updatedAt || a.createdAt) - new Date(b.updatedAt || b.createdAt));
        filtered = [...pinned, ...unpinned];
    } else {
        // 默认 / timeSortMode === 1：按时间新→旧
        const pinned = filtered.filter(i => i.pinned).sort((a, b) => {
            const aKey = Math.max(a.pinnedAt || 0, new Date(a.updatedAt || a.createdAt).getTime());
            const bKey = Math.max(b.pinnedAt || 0, new Date(b.updatedAt || b.createdAt).getTime());
            return bKey - aKey;
        });
        const unpinned = filtered.filter(i => !i.pinned);
        unpinned.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
        filtered = [...pinned, ...unpinned];
    }

    if (filtered.length === 0) { container.innerHTML = ''; emptyState.classList.remove('hidden'); updateItemCount(0); return; }
    emptyState.classList.add('hidden');

    if (currentLayout === 'masonry') {
        // 小红书风格瀑布流：两列绝对定位，长短卡片不在同一行
        container.className = ''; // 清除 space-y-3 等 class，避免 margin 干扰绝对定位
        container.style.cssText = 'position:relative;display:block;';
        container.innerHTML = filtered.map(item => createCardHTML(item)).join('');
        // 双重 rAF 确保卡片已完成布局计算
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                layoutMasonry(container);
                // 恢复滚动或滚到顶部
                if (scrollToTop) window.scrollTo({ top: 0, behavior: 'smooth' });
                else if (keepScroll) window.scrollTo(0, savedScroll);
                // 瀑布流：对位置变化的卡片做 opacity 闪烁（不能用 transform，会和 layoutMasonry 冲突）
                if (keepScroll && Object.keys(oldRects).length > 0) {
                    container.querySelectorAll('.card-wrapper').forEach(el => {
                        const id = el.dataset.id;
                        const oldRect = oldRects[id];
                        if (!oldRect) return;
                        const newRect = el.getBoundingClientRect();
                        const dy = Math.abs(oldRect.top - newRect.top);
                        if (dy < 5) return; // 位置几乎没变
                        el.style.transition = 'opacity 0.3s ease';
                        el.style.opacity = '0.4';
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                el.style.opacity = '';
                            });
                        });
                    });
                }
            });
        });
    } else {
        container.style.cssText = 'display:flex;flex-direction:column;gap:8px;';
        container.innerHTML = filtered.map(item => createCardHTML(item)).join('');
        // 列表模式：恢复 position: relative（覆盖 CSS !important）
        container.querySelectorAll('.card-wrapper').forEach(card => {
            card.style.setProperty('position', 'relative', 'important');
            card.style.width = '';
            card.style.transform = '';
        });
    }
    // 注：卡片流缩略图尺寸已在 createCardHTML 中根据内容长度直接设置，无需依赖 DOM 测量
    bindCardEvents();
    updateItemCount(filtered.length);
    startRestoredAutoClear();

    // 卡片流：恢复滚动 + FLIP 动画
    if (currentLayout !== 'masonry') {
        if (scrollToTop) window.scrollTo({ top: 0, behavior: 'smooth' });
        else if (keepScroll) window.scrollTo(0, savedScroll);
        // FLIP 动画：所有卡片从旧位置平滑过渡到新位置
        if (keepScroll && Object.keys(oldRects).length > 0) {
            container.querySelectorAll('.card-wrapper').forEach(el => {
                const id = el.dataset.id;
                const oldRect = oldRects[id];
                if (!oldRect) return;
                const newRect = el.getBoundingClientRect();
                const dx = oldRect.left - newRect.left;
                const dy = oldRect.top - newRect.top;
                if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
                el.style.transform = `translate(${dx}px, ${dy}px)`;
                el.style.transition = 'none';
                requestAnimationFrame(() => {
                    el.style.transition = 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)';
                    el.style.transform = '';
                });
            });
        }
    }

    // 置顶卡片泛光高亮（与 toast 同步：300ms 淡入，2s 后 300ms 淡出）
    const highlightItems = filtered.filter(i => i._highlight).map(i => ({ id: i.id }));
    filtered.forEach(i => { if (i._highlight) delete i._highlight; });
    if (highlightItems.length) {
        setTimeout(() => {
            highlightItems.forEach(({ id }) => {
                const el = document.getElementById('card-' + id);
                if (!el) return;
                // 滚动到页面中间位置
                const rect = el.getBoundingClientRect();
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                const targetY = scrollY + rect.top - (window.innerHeight / 2 - rect.height / 2);
                window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
                // 泛光高亮
                const theme = THEMES[currentTheme] || THEMES.blue;
                const compMatch = (theme.complementary || '').match(/#[0-9A-Fa-f]{6}/);
                const comp = compMatch ? compMatch[0] : '#F97316';
                const glow = `0 0 16px ${comp}44, 0 0 6px ${comp}22`;
                el.style.boxShadow = glow;
                el.style.outline = `1px solid ${comp}55`;
                el.style.outlineOffset = '-1px';
                el.animate([
                    { boxShadow: '0 0 0px transparent', outlineColor: 'transparent' },
                    { boxShadow: glow, outlineColor: comp + '55' }
                ], { duration: 300, easing: 'ease-out', fill: 'forwards' });
                setTimeout(() => {
                    el.animate([
                        { boxShadow: glow, outlineColor: comp + '55' },
                        { boxShadow: '0 0 0px transparent', outlineColor: 'transparent' }
                    ], { duration: 300, easing: 'ease-in', fill: 'forwards' }).onfinish = () => {
                        el.style.boxShadow = '';
                        el.style.outline = '';
                        el.style.outlineOffset = '';
                    };
                }, 2000);
            });
        }, 100);
    }
}

// ===== 卡片事件绑定（长按删除）=====
let longPressTimer = null;
let currentSlidedCard = null;
let isLongPressing = false;

function bindCardEvents() {
    document.querySelectorAll('.card-wrapper').forEach(wrapper => {
        const content = wrapper.querySelector('.card-content');
        if (!content) return;
        isLongPressing = false;

        const startLP = (e) => {
            if (batchDeleteMode) return;
            // 带图灵感卡片：图片区域（含导航按钮、圆点）不触发点按/长按效果
            const imgWrap = e.target.closest('.card-image-wrap');
            if (imgWrap) { isLongPressing = false; return; }
            isLongPressing = false;
            if (longPressTimer) clearTimeout(longPressTimer);
            wrapper.classList.add('card-pressing');
            longPressTimer = setTimeout(() => {
                isLongPressing = true;
                wrapper.classList.remove('card-pressing');
                if (currentSlidedCard && currentSlidedCard !== wrapper) closeSlidedCard(currentSlidedCard);
                content.style.transform = 'translateX(-70px)';
                currentSlidedCard = wrapper;
                if (navigator.vibrate) navigator.vibrate(50);
            }, 1000);
        };
        const cancelLP = () => {
            if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
            wrapper.classList.remove('card-pressing');
        };

        wrapper.addEventListener('touchstart', startLP, { passive: true });
        wrapper.addEventListener('mousedown', startLP);
        wrapper.addEventListener('touchend', cancelLP);
        wrapper.addEventListener('mouseup', cancelLP);
        wrapper.addEventListener('touchcancel', cancelLP);
        wrapper.addEventListener('mouseleave', cancelLP);

        content.addEventListener('click', (e) => {
            // 如果点击的是导航按钮或圆点，让它们自己处理
            if (e.target.closest('.card-img-nav') || e.target.closest('.card-img-dots') || e.target.closest('.card-img-counter')) {
                return;
            }
            if (isLongPressing) { isLongPressing = false; return; }
            if (content.style.transform === 'translateX(-70px)') { closeSlidedCard(wrapper); return; }
            if (currentSlidedCard && currentSlidedCard !== wrapper) closeSlidedCard(currentSlidedCard);
            if (batchDeleteMode) {
                const id = wrapper.dataset.id;
                if (id) toggleBatchSelect(id);
                return;
            }
            if (batchPinMode) {
                const id = wrapper.dataset.id;
                if (id) togglePinFromBatch(id);
                return;
            }
            // 清除近期恢复标记
            clearRestoredBadge(wrapper.dataset.id);
            const id = wrapper.dataset.id;
            const imgIdx = wrapper.dataset.imgIdx !== undefined ? parseInt(wrapper.dataset.imgIdx) || 0 : 0;
            if (id) showDetailModal(id, imgIdx);
        });

        // 瀑布流模式：图片区域触摸滑动切换
        const imgWrap = wrapper.querySelector('.card-image-wrap');
        if (imgWrap && wrapper.dataset.images) {
            let masonryTouchStartX = 0;
            let masonryTouchStartY = 0;
            let masonrySwipeLock = false;
            imgWrap.addEventListener('touchstart', function(e) {
                masonryTouchStartX = e.changedTouches[0].screenX;
                masonryTouchStartY = e.changedTouches[0].screenY;
            }, { passive: true });
            imgWrap.addEventListener('touchend', function(e) {
                if (masonrySwipeLock) return;
                const diffX = masonryTouchStartX - e.changedTouches[0].screenX;
                const diffY = masonryTouchStartY - e.changedTouches[0].screenY;
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    masonrySwipeLock = true;
                    const id = wrapper.dataset.id;
                    if (diffX > 0) {
                        cardImgNext(id);
                    } else {
                        cardImgPrev(id);
                    }
                    setTimeout(() => { masonrySwipeLock = false; }, 400);
                }
            }, { passive: true });
            // 触控板双指横滑切换（累积位移阈值 → 一次一张，防止使劲滑直接跳到最后）
            const mSwipeState = { lockUntil: 0, accumX: 0, direction: 0, threshold: 400 };
            imgWrap.addEventListener('wheel', function(e) {
                const absX = Math.abs(e.deltaX);
                const absY = Math.abs(e.deltaY);
                const now = Date.now();
                // 横向主导 → 累积位移切换图片，否则让正常纵向滚动
                if (absX > absY && absX > 10) {
                    e.preventDefault();
                    // 锁期间丢弃所有累积位移，防止锁过期后瞬间再触发
                    if (mSwipeState.lockUntil > now) {
                        mSwipeState.accumX = 0;
                        return;
                    }
                    const dir = e.deltaX > 0 ? 1 : -1;
                    if (dir !== mSwipeState.direction) {
                        mSwipeState.direction = dir;
                        mSwipeState.accumX = 0;
                    }
                    mSwipeState.accumX += absX;
                    if (mSwipeState.accumX >= mSwipeState.threshold) {
                        mSwipeState.lockUntil = now + 500;
                        mSwipeState.accumX = 0;
                        mSwipeState.direction = 0;
                        const id = wrapper.dataset.id;
                        if (dir > 0) cardImgNext(id);
                        else cardImgPrev(id);
                    }
                }
            }, { passive: false });
        }
    });

    document.addEventListener('click', (e) => {
        if (currentSlidedCard && !currentSlidedCard.contains(e.target)) closeSlidedCard(currentSlidedCard);
        // 批量删除/置顶模式下点击非卡片区域，保存置顶并退出
        if (batchDeleteMode || batchPinMode) {
            const isCard = e.target.closest('.card-wrapper');
            const isFab = e.target.closest('#fabMain');
            const isBatchBar = e.target.closest('#batchSelectAllBar');
            const isLayoutToggle = e.target.closest('#layoutToggleBtn');
            if (!isCard && !isFab && !isBatchBar && !isLayoutToggle) {
                if (batchDeleteMode) exitBatchDeleteMode();
                if (batchPinMode) exitBatchPinMode();
            }
        }
    });
}

function clearRestoredBadge(id) {
    if (!id) return;
    const item = items.find(i => i.id === id);
    if (item && item._justRestored) {
        delete item._justRestored;
        saveItems();
        // 延迟 1s 后移除 DOM 上的 badge（淡出效果）
        setTimeout(() => {
            const wrapper = document.getElementById('card-' + id);
            if (wrapper) {
                const badge = wrapper.querySelector('.restore-badge');
                if (badge) {
                    badge.style.transition = 'opacity 0.3s';
                    badge.style.opacity = '0';
                    setTimeout(() => badge.remove(), 300);
                }
            }
        }, 1000);
    }
}

// 1min 后自动清除所有近期恢复标记
let restoredAutoClearTimer = null;
function startRestoredAutoClear() {
    if (restoredAutoClearTimer) clearTimeout(restoredAutoClearTimer);
    const hasRestored = items.some(i => i._justRestored);
    if (!hasRestored) return;
    restoredAutoClearTimer = setTimeout(() => {
        let changed = false;
        items.forEach(item => {
            if (item._justRestored) {
                delete item._justRestored;
                changed = true;
            }
        });
        if (changed) {
            saveItems();
            document.querySelectorAll('.restore-badge').forEach(badge => {
                badge.style.transition = 'opacity 0.3s';
                badge.style.opacity = '0';
                setTimeout(() => badge.remove(), 300);
            });
        }
    }, 60000);
}

function closeSlidedCard(wrapper) {
    if (!wrapper) return;
    const c = wrapper.querySelector('.card-content');
    if (c) c.style.transform = '';
    if (currentSlidedCard === wrapper) currentSlidedCard = null;
}

// ===== 卡片 HTML =====
function createCardHTML(item) {
    const tag = tags.find(t => t.name === item.type);
    const tagEmoji = tag ? tag.emoji : '';
    const timeStr = formatTime(item.updatedAt || item.createdAt);
    const kw = currentFilter.search;
    const titleHtml = highlightText(item.title || '新记录', kw);
    // 富文本预览（不含图片）
    const contentHtml = renderContentPreview(item.content, kw);
    // 检测 content 中的所有图片
    const allImgMatches = item.content ? [...item.content.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)] : [];
    const allImageUrls = allImgMatches.map(m => m[1]);
    const firstImageUrl = allImageUrls[0] || null;
    const hasMultipleImages = allImageUrls.length > 1;
    // 批量删除模式下的复选框（右上角偏下）
    const batchCheckbox = batchDeleteMode ? `
        <div class="absolute top-4 right-2 z-10" onclick="event.stopPropagation()">
            <button onclick="toggleBatchSelect('${item.id}')" class="batch-checkbox-circle w-6 h-6 rounded-full border-2 flex items-center justify-center transition btn-press ${batchSelectedIds.has(item.id) ? 'batch-checked' : 'border-gray-300 bg-white/80'}" style="${batchSelectedIds.has(item.id) ? 'background:var(--theme-primary,#3B82F6); border-color:var(--theme-primary,#3B82F6);' : ''}">
                ${batchSelectedIds.has(item.id) ? '<svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>' : ''}
            </button>
        </div>
    ` : '';

    // 滑动删除按钮：批量模式下隐藏
    const deleteBtnHtml = (batchDeleteMode || batchPinMode) ? '' : `<div style="position:absolute;right:0;top:0;bottom:0;width:70px;background:#FEE2E2;display:flex;align-items:center;justify-content:center;z-index:1;border-radius:16px;" onclick="showDeleteModal('${item.id}', event)">
        <svg class="w-6 h-6" style="color:#EF4444;" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
    </div>`;

    // pin 针：批量删除模式下不显示；批量置顶模式下所有卡片都显示可点击的 pin 针；正常模式下只显示已置顶的
    let pinnedHtml = '';
    let pinnedHtmlInline = '';
    if (batchDeleteMode) {
        // 批量删除模式下不显示 pin 针
        pinnedHtml = '';
        pinnedHtmlInline = '';
    } else if (batchPinMode) {
        pinnedHtml = `<div class="pin-icon absolute top-3 right-2 z-10 cursor-pointer" data-id="${item.id}" onclick="event.stopPropagation(); togglePinFromBatch('${item.id}')" style="color: var(--theme-primary, #3B82F6); opacity: ${item.pinned ? '0.7' : '0.2'}; transition: opacity 0.2s;">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 12V4H17V2H7V4H8V12L6 14V16H11.2V22H12.8V16H18V14L16 12Z"/></svg>
        </div>`;
        pinnedHtmlInline = `<div class="pin-icon cursor-pointer flex-shrink-0 mt-0.5" data-id="${item.id}" onclick="event.stopPropagation(); togglePinFromBatch('${item.id}')" style="color: var(--theme-primary, #3B82F6); opacity: ${item.pinned ? '0.7' : '0.2'}; transition: opacity 0.2s;">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 12V4H17V2H7V4H8V12L6 14V16H11.2V22H12.8V16H18V14L16 12Z"/></svg>
        </div>`;
    } else if (item.pinned) {
        pinnedHtml = `<div class="pin-icon absolute top-3 right-2 z-10 cursor-pointer" data-id="${item.id}" onclick="event.stopPropagation(); togglePin('${item.id}')" style="color: var(--theme-primary, #3B82F6); opacity: 0.7; transition: opacity 0.2s;">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 12V4H17V2H7V4H8V12L6 14V16H11.2V22H12.8V16H18V14L16 12Z"/></svg>
        </div>`;
        pinnedHtmlInline = `<div class="pin-icon cursor-pointer flex-shrink-0 mt-0.5" data-id="${item.id}" onclick="event.stopPropagation(); togglePin('${item.id}')" style="color: var(--theme-primary, #3B82F6); opacity: 0.7; transition: opacity 0.2s;">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 12V4H17V2H7V4H8V12L6 14V16H11.2V22H12.8V16H18V14L16 12Z"/></svg>
        </div>`;
    }

    // 近期恢复提示（带线框，靠右）
    const restoredBadge = item._justRestored ? `<span class="restore-badge ml-auto text-[10px] px-1.5 py-[1px] rounded-lg border pointer-events-none" style="color:var(--theme-primary,#3B82F6); border-color:var(--theme-primary,#3B82F6); opacity:0.7;">近期恢复<span class="restore-dot inline-block w-1.5 h-1.5 rounded-full ml-0.5 align-middle" style="background:var(--theme-primary,#3B82F6)"></span></span>` : '';

    // 图片卡片样式（带图预览模式下，masonry 布局中有图片时显示为图片卡片）
    if (imagePreviewMode && currentLayout === 'masonry' && firstImageUrl && !batchDeleteMode && !batchPinMode) {
        // 多图轮播控件
        const imgDataAttr = hasMultipleImages ? `data-images="${allImageUrls.map(u => encodeURIComponent(u)).join(',')}" data-img-idx="0"` : '';
        const prevBtn = hasMultipleImages ? `<div class="card-img-nav prev dimmed" id="card-nav-prev-${item.id}" onclick="event.stopPropagation(); cardImgPrev('${item.id}')"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg></div>` : '';
        const nextBtn = hasMultipleImages ? `<div class="card-img-nav next" id="card-nav-next-${item.id}" onclick="event.stopPropagation(); cardImgNext('${item.id}')"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></div>` : '';
        const dotsHtml = hasMultipleImages ? `<div class="card-img-dots">${allImageUrls.map((_, i) => `<div class="card-img-dot ${i === 0 ? 'active' : ''}" data-dot-idx="${i}" onclick="event.stopPropagation(); cardImgGoTo('${item.id}', ${i})"></div>`).join('')}</div>` : '';
        const counterHtml = hasMultipleImages ? `<div class="card-img-counter"><span id="card-img-counter-${item.id}">1/${allImageUrls.length}</span></div>` : '';

        const cardImgPreviewAttr = `data-card-id="${item.id}"`;

        return `<div class="card-wrapper masonry-item" id="card-${item.id}" data-id="${item.id}" style="position:relative;overflow:hidden;border-radius:16px;" ${imgDataAttr}>
            ${deleteBtnHtml}
            ${batchCheckbox}
            <div class="card-content bg-white rounded-2xl overflow-hidden card-shadow" style="position:relative;z-index:2;">
                <div class="card-image-wrap" id="card-img-wrap-${item.id}" style="position:relative;width:100%;padding-bottom:75%;overflow:hidden;background:#f5f5f5;border-radius:16px 16px 0 0;">
                    <div id="card-img-slider-${item.id}" class="card-img-slider">
                        ${allImageUrls.map(url => `<img src="${url}" decoding="async" onerror="this.style.display='none'">`).join('')}
                    </div>
                    ${prevBtn}
                    ${nextBtn}
                    ${dotsHtml}
                    ${counterHtml}
                </div>
                <div class="p-3">
                    <div class="flex items-start gap-1">
                        <h4 class="font-semibold text-gray-900 text-[13px] line-clamp-2 flex-1">${titleHtml}</h4>
                        ${pinnedHtmlInline}
                    </div>
                    <div class="flex items-center gap-2 mt-1.5">
                        <span class="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">${tagEmoji} ${item.type}</span>
                        <span class="text-[10px] text-gray-400">${timeStr}</span>
                        ${restoredBadge}
                    </div>
                </div>
            </div>
        </div>`;
    }

    if (currentLayout === 'masonry') {
        return `<div class="card-wrapper masonry-item" id="card-${item.id}" data-id="${item.id}" style="position:relative;overflow:hidden;border-radius:16px;">
            ${deleteBtnHtml}
            ${batchCheckbox}
            <div class="card-content bg-white rounded-2xl p-4 card-shadow" style="position:relative;z-index:2;">
                <div class="flex items-start gap-1">
                    <h4 class="font-semibold text-gray-900 text-[14px] mb-1 line-clamp-2 flex-1 min-w-0">${titleHtml}</h4>
                    ${pinnedHtmlInline}
                </div>
                <p class="text-[12px] text-gray-500 line-clamp-5">${contentHtml}</p>
                <div class="flex items-center gap-2 mt-2">
                    <span class="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">${tagEmoji} ${item.type}</span>
                    <span class="text-[11px] text-gray-400">${timeStr}</span>
                    ${restoredBadge}
                </div>
            </div>
        </div>`;
    }

    // 卡片流（list 模式）：根据原始内容长度估算缩略图尺寸
    // 带图预览模式关闭时不显示缩略图；开启时根据内容长度设定尺寸
    // 直接写入 HTML 以消除 DOM 测量时序导致的刷新后变小问题
    // 使用 item.content 原始文本长度估算内容体量（中文每 ~22 字视觉换一行）
    // 档位：0-1行 100px / 2行 120px / 3行 130px / 4+行 140px
    let listImgSize = 100;
    if (firstImageUrl && imagePreviewMode) {
        const rawText = (item.content || '').replace(/!\[[^\]]*\]\([^)]+\)/g, '').replace(/\[([^\]]*)\]\([^)]+\)/g, '$1').replace(/[#*_>\-`\s]/g, '');
        const approxLines = Math.ceil(rawText.length / 22);
        if (approxLines >= 4) listImgSize = 140;
        else if (approxLines >= 3) listImgSize = 130;
        else if (approxLines >= 2) listImgSize = 120;
        else listImgSize = 100;
    }

    // 构建缩略图HTML
    const displayImages = allImageUrls.slice(0, 3);
    const hasStackImages = displayImages.length >= 2 && firstImageUrl && imagePreviewMode;

    // 单图缩略图（放在card-content内部）
    const singleThumbHtml = (!hasStackImages && firstImageUrl && imagePreviewMode) ? `<div class="flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 card-img-container" style="width:${listImgSize}px;height:${listImgSize}px;flex-shrink:0;" onclick="event.stopPropagation(); showDetailModal('${item.id}', 0);">
        <img src="${firstImageUrl}" style="width:100%;height:100%;object-fit:cover;" decoding="async" onerror="this.style.display='none';this.parentElement.style.background='#f5f5f5';">
    </div>` : '';

    // 多图层叠缩略图（放在card-wrapper外部，允许溢出）
    let stackThumbHtml = '';
    if (hasStackImages) {
        const stackSize = listImgSize;
        const totalImages = allImageUrls.length;
        const imagesAttr = `data-images="${allImageUrls.map(u => encodeURIComponent(u)).join(',')}" data-total="${totalImages}" data-current-idx="0"`;

        // 5层：远左、近左、中心、近右、远右
        // 初始状态(idx=0)：中心=img0，近右=img1，远右=img2，左侧隐藏
        const img0 = allImageUrls[0] || '';
        const img1 = allImageUrls.length >= 2 ? allImageUrls[1] : '';
        const img2 = allImageUrls.length >= 3 ? allImageUrls[2] : '';
        const layersHtml = `
                <div class="cs-layer cs-layer-0" style="--sz:${stackSize}px;display:none;"><img src="" decoding="async" onerror="this.style.display='none'"></div>
                <div class="cs-layer cs-layer-1" style="--sz:${stackSize}px;display:none;"><img src="" decoding="async" onerror="this.style.display='none'"></div>
                <div class="cs-layer cs-layer-2" style="--sz:${stackSize}px;"><img src="${img0}" decoding="async" onerror="this.style.display='none'"></div>
                <div class="cs-layer cs-layer-3" style="--sz:${stackSize}px;${img1 ? '' : 'display:none;'}"><img src="${img1}" decoding="async" onerror="this.style.display='none'"></div>
                <div class="cs-layer cs-layer-4" style="--sz:${stackSize}px;${img2 ? '' : 'display:none;'}"><img src="${img2}" decoding="async" onerror="this.style.display='none'"></div>`;

        stackThumbHtml = `<div class="cs-outer cs-single-mode" id="cs-${item.id}" ${imagesAttr} style="--sz:${stackSize}px;" tabindex="0"
            onmouseenter="csHoverIn('${item.id}')" onmouseleave="csHoverOut('${item.id}')"
            onkeydown="csKeyDown(event, '${item.id}')"
            onclick="csClick('${item.id}', event)">
            <div class="cs-layers">${layersHtml}</div>
            <div class="cs-badge">${totalImages}</div>
            <div class="cs-scroll-indicator"><div class="cs-scroll-track"><div class="cs-scroll-thumb" style="left:0px;"></div></div></div>
        </div>`;
    }

    // 外层包装器：允许缩略图溢出
    const needOuterWrap = hasStackImages;
    const openWrap = needOuterWrap ? `<div class="card-list-row" data-id="${item.id}" style="--sz:${listImgSize}px;">` : '';
    const closeWrap = needOuterWrap ? '</div>' : '';

    return `${openWrap}<div class="card-wrapper" id="card-${item.id}" data-id="${item.id}" style="position:relative;overflow:hidden;border-radius:16px;">
        ${deleteBtnHtml}
        ${batchCheckbox}
        <div class="card-content bg-white rounded-2xl p-4 card-shadow flex items-center gap-3 overflow-hidden" style="position:relative;z-index:2;">
            <div class="flex-1 min-w-0 card-text-area" data-stack="${hasStackImages ? '1' : '0'}">
                <div class="flex items-start gap-1">
                    ${pinnedHtmlInline}
                    <h4 class="font-semibold text-gray-900 text-[15px] mb-0.5 flex-1 min-w-0">${titleHtml}</h4>
                </div>
                <p class="text-[13px] text-gray-500 mb-2.5 line-clamp-4">${contentHtml}</p>
                <div class="flex items-center gap-2">
                    <span class="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">${tagEmoji} ${item.type}</span>
                    <span class="text-[11px] text-gray-400">${timeStr}</span>
                    ${restoredBadge}
                </div>
            </div>
            ${singleThumbHtml}
        </div>
    </div>${stackThumbHtml}${closeWrap}`;
}

// 更新导航按钮的边界状态（dimmed = 透明度降低，不是disabled隐藏）
function updateCardNavState(id, idx, total) {
    const prevBtn = document.getElementById('card-nav-prev-' + id);
    const nextBtn = document.getElementById('card-nav-next-' + id);
    if (prevBtn) prevBtn.classList.toggle('dimmed', idx === 0);
    if (nextBtn) nextBtn.classList.toggle('dimmed', idx === total - 1);
}

// 滑动到指定图片
function slideCardImg(id, idx, skipTransition) {
    const slider = document.getElementById('card-img-slider-' + id);
    if (!slider) return;
    if (skipTransition) slider.style.transition = 'none';
    slider.style.transform = 'translateX(-' + (idx * 100) + '%)';
    if (skipTransition) {
        // 强制 reflow 后恢复 transition
        void slider.offsetHeight;
        slider.style.transition = '';
    }
}

// ===== 层叠卡片交互：hover放大 + 键盘/触控板切换 =====
let csActiveId = null;
const csResetTimers = {};   // 3s回首页定时器
const csSingleTimers = {};  // 5s洗牌收起定时器

function csHoverIn(id) {
    const el = document.getElementById('cs-' + id);
    if (!el) return;
    // 取消所有恢复定时器
    if (csResetTimers[id]) { clearTimeout(csResetTimers[id]); delete csResetTimers[id]; }
    if (csSingleTimers[id]) { clearTimeout(csSingleTimers[id]); delete csSingleTimers[id]; }

    el.classList.add('cs-hovered');
    // 文字区域展开避让
    const row = el.closest('.card-list-row');
    if (row) row.classList.add('cs-row-active');

    // 如果在单图模式，洗牌展开（移除single-mode，CSS transition自动动画）
    if (el.classList.contains('cs-single-mode')) {
        el.classList.remove('cs-single-mode');
        // 确保邻居层有正确的图片和display状态
        const images = el.dataset.images ? el.dataset.images.split(',').map(u => decodeURIComponent(u)) : [];
        const idx = parseInt(el.dataset.currentIdx) || 0;
        csUpdateState(id, idx, images);
    }

    csActiveId = id;
    el.focus({ preventScroll: true });
}

function csHoverOut(id) {
    const el = document.getElementById('cs-' + id);
    if (!el) return;
    el.classList.remove('cs-hovered');
    if (csActiveId === id) csActiveId = null;
    el.blur();

    // 3秒后回到首图（展开状态仍在）
    csResetTimers[id] = setTimeout(() => {
        csResetToFirst(id);
        delete csResetTimers[id];
    }, 3000);

    // 5秒后洗牌收起（邻居层旋转淡出回中心）
    csSingleTimers[id] = setTimeout(() => {
        csShuffleClose(id);
        delete csSingleTimers[id];
    }, 5000);
}

// 点击层叠缩略图：跳转到详情页对应图片
function csClick(id, event) {
    if (event) event.stopPropagation();
    const el = document.getElementById('cs-' + id);
    if (!el) return;
    const currentIdx = parseInt(el.dataset.currentIdx) || 0;
    // 从 card-list-row 或 cs-outer 的 data-id 获取 item id
    const row = el.closest('.card-list-row');
    const itemId = row ? row.dataset.id : id;
    showDetailModal(itemId, currentIdx);
}

// 3s：回到首图，展开状态仍在
function csResetToFirst(id) {
    const el = document.getElementById('cs-' + id);
    if (!el) return;
    const images = el.dataset.images ? el.dataset.images.split(',').map(u => decodeURIComponent(u)) : [];
    if (images.length === 0) return;
    const currentIdx = parseInt(el.dataset.currentIdx) || 0;
    if (currentIdx === 0) return;

    el.dataset.currentIdx = 0;
    csUpdateState(id, 0, images);
    // 主图淡入
    setTimeout(function() {
        const el2 = document.getElementById('cs-' + id);
        if (!el2) return;
        const layer2 = el2.querySelector('.cs-layer-2');
        if (layer2) {
            layer2.classList.add('cs-fade-in');
            setTimeout(function() { layer2.classList.remove('cs-fade-in'); }, 350);
        }
    }, 10);
}

// 5s：洗牌收起，邻居层旋转淡出回中心
function csShuffleClose(id) {
    const el = document.getElementById('cs-' + id);
    if (!el) return;
    // 添加single-mode，CSS transition自动动画邻居层回中心+淡出
    el.classList.add('cs-single-mode');
    // 收起文字区域避让
    const row = el.closest('.card-list-row');
    if (row) row.classList.remove('cs-row-active');
}

// 全局键盘监听（不依赖元素focus）
document.addEventListener('keydown', function(e) {
    if (!csActiveId) return;
    const el = document.getElementById('cs-' + csActiveId);
    if (!el || !el.classList.contains('cs-hovered')) return;
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        csSwitchImage(csActiveId, 1);
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        csSwitchImage(csActiveId, -1);
    }
});

function csKeyDown(event, id) {
    // 保留元素上的keydown作为备用
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        csSwitchImage(id, event.key === 'ArrowRight' ? 1 : -1);
    }
}

// 触控板横向滑动（wheel事件 deltaX，累积位移阈值 → 一次一张）
const csSwipeState = { lockUntil: 0, accumX: 0, direction: 0, threshold: 400 };
document.addEventListener('wheel', function(e) {
    if (!csActiveId) return;
    const el = document.getElementById('cs-' + csActiveId);
    if (!el || !el.classList.contains('cs-hovered')) return;
    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);
    const now = Date.now();
    // 横向主导 → 累积位移切换图片，否则忽略
    if (absX > absY && absX > 10) {
        e.preventDefault();
        // 锁期间丢弃所有累积位移，防止锁过期后瞬间再触发
        if (csSwipeState.lockUntil > now) {
            csSwipeState.accumX = 0;
            return;
        }
        const dir = e.deltaX > 0 ? 1 : -1;
        if (dir !== csSwipeState.direction) {
            csSwipeState.direction = dir;
            csSwipeState.accumX = 0;
        }
        csSwipeState.accumX += absX;
        if (csSwipeState.accumX >= csSwipeState.threshold) {
            csSwipeState.lockUntil = now + 500;
            csSwipeState.accumX = 0;
            csSwipeState.direction = 0;
            csSwitchImage(csActiveId, dir);
        }
    }
}, { passive: false });

// 防抖锁：防止触控板/wheel连续触发导致跳图
const csSwitchLock = {};

function csSwitchImage(id, direction) {
    const el = document.getElementById('cs-' + id);
    if (!el) return;

    // 防抖：500ms内同一卡片只响应一次切换
    if (csSwitchLock[id]) return;
    csSwitchLock[id] = true;
    setTimeout(() => { delete csSwitchLock[id]; }, 500);

    const images = el.dataset.images ? el.dataset.images.split(',').map(u => decodeURIComponent(u)) : [];
    const total = images.length;
    let idx = parseInt(el.dataset.currentIdx) || 0;
    const newIdx = idx + direction;

    if (newIdx < 0 || newIdx >= total) {
        // 边界时立即释放锁，允许反向滑动
        delete csSwitchLock[id];
        return;
    }

    // 翻页动画
    el.classList.remove('cs-flip-fwd', 'cs-flip-bwd');
    void el.offsetWidth;
    el.classList.add(direction > 0 ? 'cs-flip-fwd' : 'cs-flip-bwd');
    setTimeout(() => el.classList.remove('cs-flip-fwd', 'cs-flip-bwd'), 200);

    // 更新状态
    el.dataset.currentIdx = newIdx;
    csUpdateState(id, newIdx, images);
}

function csUpdateState(id, idx, images) {
    const el = document.getElementById('cs-' + id);
    if (!el) return;
    const total = images.length;

    // 5层：远左(idx-2)、近左(idx-1)、中心(idx)、近右(idx+1)、远右(idx+2)
    const layers = [
        el.querySelector('.cs-layer-0'),
        el.querySelector('.cs-layer-1'),
        el.querySelector('.cs-layer-2'),
        el.querySelector('.cs-layer-3'),
        el.querySelector('.cs-layer-4')
    ];

    // 计算每层对应的图片索引
    const offsets = [-2, -1, 0, 1, 2];
    for (let i = 0; i < 5; i++) {
        const imgIdx = idx + offsets[i];
        const layer = layers[i];
        if (!layer) continue;
        const img = layer.querySelector('img');
        if (imgIdx >= 0 && imgIdx < total) {
            if (img) {
                img.src = images[imgIdx];
                img.style.display = ''; // 恢复可能被onerror隐藏的img
            }
            layer.style.display = '';
        } else {
            layer.style.display = 'none';
        }
    }

    // 更新滚轮指示器位置（高亮宽度根据图片总数动态计算）
    if (total > 1) {
        const thumb = el.querySelector('.cs-scroll-thumb');
        if (thumb) {
            const trackWidth = 36;
            const thumbWidth = Math.max(5, Math.round(trackWidth / total));
            const maxLeft = trackWidth - thumbWidth;
            const left = total <= 1 ? 0 : Math.round((idx / (total - 1)) * maxLeft);
            thumb.style.width = thumbWidth + 'px';
            thumb.style.left = left + 'px';
        }
    }
}

// 从 markdown 内容中解析所有图片，支持原图信息
// 返回 [{compressed: '压缩图URL', original: '原图URL或null'}] 数组
function parseImagesFromMarkdown(content) {
    if (!content) return [];
    const results = [];
    const imgRegex = /!\[(.*?)\]\(([^)]+)\)/g;
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
        const altText = match[1] || '';
        const url = match[2];
        if (altText.indexOf('ORIGINAL:') === 0) {
            const originalUrl = altText.substring('ORIGINAL:'.length);
            results.push({ compressed: url, original: originalUrl });
        } else {
            results.push({ compressed: url, original: null });
        }
    }
    return results;
}

// 点击图片卡片中的图片，打开图片预览弹窗
function cardImageOpenPreview(cardId, imgIdx) {
    const item = items.find(i => i.id === cardId);
    const imagesInfo = item ? parseImagesFromMarkdown(item.content) : [];
    let compressedImages = imagesInfo.map(i => i.compressed);
    let originalImages = imagesInfo.map(i => i.original);
    if (compressedImages.length === 0) return;
    let title = '';
    let timeStr = '';
    let body = '';
    if (item) {
        const match = item.title.match(/^(\S+)\s+(.*)$/);
        title = match ? match[2] || '' : item.title || '';
        timeStr = formatTime(item.updatedAt || item.createdAt);
        body = item.content ? item.content.replace(/!\[[^\]]*\]\([^)]+\)/g, '').replace(/\s+/g, ' ').trim().substring(0, 200) : '';
    }
    openImagePreview(compressedImages[imgIdx] || '', originalImages[imgIdx] || null, compressedImages, originalImages, imgIdx, title, timeStr, body);
}

// masonry 卡片图片切换的防抖锁（一次一张，防止一口气到底）
const cardImgSwitchLock = {};

// 多图卡片轮播：上一张
function cardImgPrev(id) {
    const wrapper = document.getElementById('card-' + id);
    if (!wrapper) return;
    if (cardImgSwitchLock[id]) return;
    cardImgSwitchLock[id] = true;
    setTimeout(() => { delete cardImgSwitchLock[id]; }, 400);
    const imagesAttr = wrapper.dataset.images;
    if (!imagesAttr) return;
    const images = imagesAttr.split(',').map(decodeURIComponent);
    let idx = parseInt(wrapper.dataset.imgIdx || '0');
    if (idx <= 0) { delete cardImgSwitchLock[id]; return; }
    idx = idx - 1;
    wrapper.dataset.imgIdx = idx;
    slideCardImg(id, idx);
    wrapper.querySelectorAll('.card-img-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
    });
    const counter = document.getElementById('card-img-counter-' + id);
    if (counter) counter.textContent = (idx + 1) + '/' + images.length;
    updateCardNavState(id, idx, images.length);
}

// 多图卡片轮播：下一张
function cardImgNext(id) {
    const wrapper = document.getElementById('card-' + id);
    if (!wrapper) return;
    if (cardImgSwitchLock[id]) return;
    cardImgSwitchLock[id] = true;
    setTimeout(() => { delete cardImgSwitchLock[id]; }, 400);
    const imagesAttr = wrapper.dataset.images;
    if (!imagesAttr) return;
    const images = imagesAttr.split(',').map(decodeURIComponent);
    let idx = parseInt(wrapper.dataset.imgIdx || '0');
    if (idx >= images.length - 1) { delete cardImgSwitchLock[id]; return; }
    idx = idx + 1;
    wrapper.dataset.imgIdx = idx;
    slideCardImg(id, idx);
    wrapper.querySelectorAll('.card-img-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
    });
    const counter = document.getElementById('card-img-counter-' + id);
    if (counter) counter.textContent = (idx + 1) + '/' + images.length;
    updateCardNavState(id, idx, images.length);
}

// 多图卡片轮播：跳转到指定图片（不受防抖限制）
function cardImgGoTo(id, targetIdx) {
    const wrapper = document.getElementById('card-' + id);
    if (!wrapper) return;
    const imagesAttr = wrapper.dataset.images;
    if (!imagesAttr) return;
    const images = imagesAttr.split(',').map(decodeURIComponent);
    if (targetIdx < 0 || targetIdx >= images.length) return;
    let idx = parseInt(wrapper.dataset.imgIdx || '0');
    if (idx === targetIdx) return;
    idx = targetIdx;
    wrapper.dataset.imgIdx = idx;
    slideCardImg(id, idx);
    wrapper.querySelectorAll('.card-img-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
    });
    const counter = document.getElementById('card-img-counter-' + id);
    if (counter) counter.textContent = (idx + 1) + '/' + images.length;
    updateCardNavState(id, idx, images.length);
}

function formatTime(iso) {
    const d = new Date(iso);
    return `${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}
function escapeHtml(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
function highlightText(text, keyword) {
    const escaped = escapeHtml(text);
    if (!keyword) return escaped;
    const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return escaped.replace(regex, '<mark class="search-highlight">$1</mark>');
}

// 首页卡片富文本预览（精简版：只保留加粗、换行、列表前标）
function renderContentPreview(content, keyword) {
    if (!content) return '';
    let text = content;
    // 去掉图片标记 ![alt](url)，直接删除不显示占位符
    text = text.replace(/!\[[^\]]*\]\([^)]+\)/g, '');
    // 去掉链接标记 [text](url)，只保留 text
    text = text.replace(/\[([^\]]*)\]\([^)]+\)/g, '$1');
    // 去掉标题标记（### 等），不限定行首（预览截断后可能不在行首）
    text = text.replace(/#{1,5}\s+/g, ' ');
    // 去掉引用标记
    text = text.replace(/^>\s/gm, '');
    // 去掉任务列表标记
    text = text.replace(/^- \[[ x]\]\s/gm, '');
    // 去掉行内代码标记
    text = text.replace(/`([^`]*)`/g, '$1');
    // 去掉加粗/斜体标记
    text = text.replace(/\*\*(.*?)\*\*/g, '$1');
    text = text.replace(/\*(.*?)\*/g, '$1');
    // 去掉分割线
    text = text.replace(/^---+$/gm, '');
    // 处理无序列表前标（包括缩进的）
    text = text.replace(/^(\s*)-\s+/gm, function(m, indent) {
        const level = indent.replace(/\t/g, '   ').length;
        const symbols = ['•', '○', '■'];
        const sym = symbols[Math.min(Math.floor(level / 3), 2)];
        // 缩进的子项前添加换行，保持层级感
        return level > 0 ? '\n' + sym + ' ' : sym + ' ';
    });
    // 处理有序列表前标（数字. 字母. 罗马数字.）
    text = text.replace(/^(\s*)(\d+)\.\s+/gm, function(m, indent, num) {
        return indent ? '\n' + num + '. ' : num + '. ';
    });
    text = text.replace(/^(\s*)([a-zA-Z])\.\s+/gm, function(m, indent, letter) {
        return indent ? '\n' + letter + '. ' : letter + '. ';
    });
    text = text.replace(/^(\s*)([ivxIVX]+)\.\s+/gm, function(m, indent, roman) {
        return indent ? '\n' + roman + '. ' : roman + '. ';
    });
    // 合并连续空行为单行（避免预览中出现大片空白）
    text = text.replace(/\n{2,}/g, '\n');
    // 去掉首尾空白
    text = text.trim();
    // 转义 HTML
    text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // 换行（连续空行合并为一个换行）
    text = text.replace(/\n{2,}/g, '\n');
    text = text.replace(/\n/g, '<br>');
    // 搜索高亮
    if (keyword) {
        const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        text = text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }
    return text;
}

// ===== Emoji 选择器（内置图标库 + 最近使用历史）=====
let emojiPage = 0;
const EMOJI_PAGE_SIZE = 80;

function openEmojiPicker(target) {
    emojiPickerTarget = target;
    emojiPage = 0;
    const modal = document.getElementById('emojiPickerModal');
    renderEmojiGrid();
    modal.classList.remove('hidden');
}

function renderEmojiGrid() {
    const grid = document.getElementById('emojiGrid');

    // 确定当前选中的 emoji
    let currentSelected = '💡';
    if (emojiPickerTarget === 'input') currentSelected = currentEmoji;
    else if (emojiPickerTarget === 'detail') currentSelected = detailEmoji;
    else if (emojiPickerTarget === 'newTag') currentSelected = newTagEmoji;
    else if (emojiPickerTarget === 'inlineTag') currentSelected = inlineTagEmoji;
    else if (emojiPickerTarget === 'editTag') currentSelected = editTagEmoji;
    else if (emojiPickerTarget === 'fullscreen') currentSelected = detailEmoji;
    else if (emojiPickerTarget === 'noteCompact' || emojiPickerTarget === 'noteGallery' || emojiPickerTarget === 'imageFullscreen') {
        // 直接从 DOM 按钮读取当前 emoji，比正则提取更可靠
        const btnMap = { 'noteCompact': 'noteFullscreenEmojiBtn', 'noteGallery': 'noteFullscreenGalleryEmojiBtn', 'imageFullscreen': 'imageFullscreenEmojiBtn' };
        const el = document.getElementById(btnMap[emojiPickerTarget]);
        if (el && el.textContent.trim()) currentSelected = el.textContent.trim();
    }

    // 高亮样式：主题色浅底 + 主题色描边（仅主库使用）
    const highlightStyle = `style="background-color: color-mix(in srgb, var(--theme-primary, #3B82F6) 15%, white); outline: 1.5px solid var(--theme-primary, #3B82F6); outline-offset: -1px;"`;
    const sel = (emoji) => emoji === currentSelected ? highlightStyle : '';
    const btn = (emoji) => `<button class="emoji-grid-item w-[48px] h-[48px] flex items-center justify-center rounded-lg text-[26px] hover:bg-gray-100 active:bg-gray-200 transition" onclick="selectEmojiFromGrid('${emoji}')" data-emoji="${emoji}" ${sel(emoji)}>${emoji}</button>`;
    // 最近使用的按钮不带高亮，只供点按
    const recentBtn = (emoji) => `<button class="w-[48px] h-[48px] flex items-center justify-center rounded-lg text-[26px] hover:bg-gray-100 active:bg-gray-200 transition" onclick="selectEmojiFromGrid('${emoji}')">${emoji}</button>`;

    // 最近使用：固定1排，pin在顶部（独立于滚动区域）
    const recentBar = document.getElementById('emojiRecentBar');
    const recentRow = document.getElementById('emojiRecentRow');
    if (emojiRecent.length > 0 && recentBar && recentRow) {
        // 1 排约 8 个
        const recentSlice = emojiRecent.slice(0, 8);
        recentRow.innerHTML = recentSlice.map(e => recentBtn(e)).join('');
        recentBar.classList.remove('hidden');
    } else if (recentBar) {
        recentBar.classList.add('hidden');
    }

    // 主库：可滚动区域
    let html = '';
    // 自动加载到包含当前选中 emoji 的页数
    if (currentSelected !== '💡') {
        const idx = EMOJI_LIBRARY.indexOf(currentSelected);
        if (idx >= 0) {
            const neededPage = Math.floor(idx / EMOJI_PAGE_SIZE);
            if (neededPage > emojiPage) emojiPage = neededPage;
        }
        // 如果 emoji 不在库中，临时插入到库开头以便高亮显示
        else if (idx < 0) {
            EMOJI_LIBRARY.unshift(currentSelected);
        }
    }
    const start = 0;
    const end = (emojiPage + 1) * EMOJI_PAGE_SIZE;
    const visibleEmojis = EMOJI_LIBRARY.slice(start, end);
    const hasMore = end < EMOJI_LIBRARY.length;

    html += '<div class="flex flex-wrap gap-[4px]">';
    visibleEmojis.forEach(e => { html += btn(e); });
    html += '</div>';

    if (hasMore) {
        const remaining = EMOJI_LIBRARY.length - end;
        html += `<button onclick="loadMoreEmoji()" class="w-full py-2.5 text-[13px] text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition mt-2 btn-press">加载更多（剩余 ${remaining} 个）</button>`;
    }

    grid.innerHTML = html;

    // 自动滚动到当前选中的 emoji
    setTimeout(() => {
        const selectedBtn = grid.querySelector(`button[data-emoji="${currentSelected}"]`);
        if (selectedBtn && selectedBtn.scrollIntoView) {
            selectedBtn.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
    }, 50);
}

function loadMoreEmoji() {
    emojiPage++;
    renderEmojiGrid();
}

function selectEmojiFromGrid(emoji) {
    // 添加到最近使用（去重，最多保留 24 个）
    emojiRecent = emojiRecent.filter(e => e !== emoji);
    emojiRecent.unshift(emoji);
    if (emojiRecent.length > 24) emojiRecent = emojiRecent.slice(0, 24);
    saveEmojiRecent();

    if (emojiPickerTarget === 'input') {
        currentEmoji = emoji;
        document.getElementById('inputEmojiBtn').textContent = currentEmoji;
    } else if (emojiPickerTarget === 'detail') {
        detailEmoji = emoji;
        document.getElementById('detailEmojiBtn').textContent = detailEmoji;
    } else if (emojiPickerTarget === 'newTag') {
        newTagEmoji = emoji;
        document.getElementById('newTagEmojiBtn').textContent = newTagEmoji;
    } else if (emojiPickerTarget === 'inlineTag') {
        inlineTagEmoji = emoji;
        document.getElementById('inlineTagEmojiBtn').textContent = inlineTagEmoji;
    } else if (emojiPickerTarget === 'editTag') {
        editTagEmoji = emoji;
        document.getElementById('editTagEmojiBtn').textContent = editTagEmoji;
    } else if (emojiPickerTarget === 'fullscreen') {
        detailEmoji = emoji;
        document.getElementById('fullscreenEmojiBtn').textContent = detailEmoji;
    } else if (emojiPickerTarget === 'noteCompact' || emojiPickerTarget === 'noteGallery' || emojiPickerTarget === 'imageFullscreen') {
        if (window.currentFullscreenItem) {
            const m = window.currentFullscreenItem.title.match(/^\S+\s+(.*)$/);
            const restTitle = m ? m[1] : (window.currentFullscreenItem.title || '');
            window.currentFullscreenItem.title = emoji + ' ' + restTitle;
            _previewModified = true;
            const btns = {
                'noteCompact': 'noteFullscreenEmojiBtn',
                'noteGallery': 'noteFullscreenGalleryEmojiBtn',
                'imageFullscreen': 'imageFullscreenEmojiBtn'
            };
            for (const [key, elId] of Object.entries(btns)) {
                const el = document.getElementById(elId);
                if (el) el.textContent = emoji;
            }
            saveItems();
        }
    }

    // 选择后直接关闭弹窗
    closeEmojiPicker();
}

function closeEmojiPicker() { document.getElementById('emojiPickerModal').classList.add('hidden'); }

function openFullscreenEmojiPicker(target) {
    if (!window.currentFullscreenItem) return;
    // 防止重复打开叠加
    closeEmojiPicker();
    emojiPickerTarget = target;
    emojiPage = 0;
    const modal = document.getElementById('emojiPickerModal');
    renderEmojiGrid();
    modal.classList.remove('hidden');
    if (typeof event !== 'undefined' && event && event.stopPropagation) event.stopPropagation();
}

function openFullscreenTypePicker(target) {
    if (!window.currentFullscreenItem) return;
    closeFullscreenTypePicker();
    fullscreenTypePickerTarget = target;
    const listEl = document.getElementById('fullscreenTypeList');
    if (!listEl) return;

    // 仅显示用户自建分类（过滤掉 "全部" 和系统预设的 "未分类"）
    const userTags = tags.filter(t => t.id !== 'all' && !t.system);
    if (!userTags || userTags.length === 0) {
        listEl.innerHTML = '<p class="text-[13px] text-gray-500 text-center py-5">请先创建一个分类</p>';
    } else {
        const currentTypeName = window.currentFullscreenItem.type || '';
        let selectedIndex = -1;
        let html = '';
        userTags.forEach((tag, idx) => {
            const isSelected = tag.name === currentTypeName;
            if (isSelected) selectedIndex = idx;
            // 使用 outline 高亮（不会被 overflow 容器截断），主题色浅底+描边
            const selectedStyle = isSelected
                ? `style="background-color: color-mix(in srgb, var(--theme-primary, #3B82F6) 15%, white); outline: 1.5px solid var(--theme-primary, #3B82F6); outline-offset: -1.5px;"`
                : '';
            const normalClass = isSelected ? '' : 'hover:bg-gray-100';
            html += `<button class="w-full flex items-center gap-2 px-3 py-2.5 rounded-2xl transition btn-press ${normalClass}" data-type-index="${idx}" onclick="selectFullscreenType('${escapeAttr(tag.name)}'); return false;" ${selectedStyle}>
                <span class="text-[20px]">${tag.emoji || ''}</span>
                <span class="text-[14px] font-medium text-gray-900 flex-1 text-left">${escapeHtml(tag.name)}</span>
                ${isSelected ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" style="color: var(--theme-primary, #3B82F6);"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>' : ''}
            </button>`;
        });
        listEl.innerHTML = html;

        // 自动滚动到当前选中项（延迟到DOM渲染后）
        if (selectedIndex >= 0) {
            setTimeout(() => {
                const selectedBtn = listEl.querySelector(`[data-type-index="${selectedIndex}"]`);
                if (selectedBtn && selectedBtn.scrollIntoView) {
                    selectedBtn.scrollIntoView({ behavior: 'auto', block: 'center' });
                }
            }, 50);
        }
    }
    document.getElementById('fullscreenTypePickerModal').classList.remove('hidden');
    if (typeof event !== 'undefined' && event && event.stopPropagation) event.stopPropagation();
}

function closeFullscreenTypePicker() {
    document.getElementById('fullscreenTypePickerModal').classList.add('hidden');
}

function selectFullscreenType(tagName) {
    if (!window.currentFullscreenItem) return;
    const tag = tags.find(t => t.name === tagName);
    if (!tag) return;
    window.currentFullscreenItem.type = tagName;
    _previewModified = true;
    saveItems();

    // 统一更新所有可能的分类显示位置（两种模式+两种布局）
    const displayText = `${tag.emoji || ''} ${tag.name}`.trim();
    const allTypeIds = [
        'noteFullscreenTypeBtn',      // note + 无图（紧凑头部）
        'noteFullscreenGalleryTypeBtn', // note + 有图（画廊标题）
        'imageFullscreenTypeBtn'       // 图文全屏
    ];
    allTypeIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = displayText;
    });

    closeFullscreenTypePicker();
}

function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ===== Tag 管理 =====
function toggleTagManage() {
    const menu = document.getElementById('tagGearMenuModal');
    const icon = document.getElementById('tagGearIcon');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        icon.classList.add('spin');
        renderTagManageList();
        updateTimeSortBtn();
    } else {
        closeTagGearMenu();
    }
}
function closeTagGearMenu() {
    document.getElementById('tagGearMenuModal').classList.add('hidden');
    document.getElementById('tagGearIcon').classList.remove('spin');
    document.getElementById('addTagArea').classList.add('hidden');
    document.getElementById('editTagArea').classList.add('hidden');
    showFabCheckmark();
}
function closeTagManage() {
    document.getElementById('tagManageModal').classList.add('hidden');
    document.getElementById('tagGearIcon').classList.remove('spin');
    document.getElementById('addTagArea').classList.add('hidden');
    document.getElementById('editTagArea').classList.add('hidden');
    showFabCheckmark();
    editTagId = null;
}

function renderTagManageList() {
    const list = document.getElementById('tagManageList');
    list.innerHTML = tags.filter(t => t.id !== 'all' && !t.system).map((tag, index) => `
        <div class="tag-manage-item flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50" draggable="true" data-index="${index}" data-id="${tag.id}">
            <div class="flex items-center gap-3 flex-1">
                <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16"/></svg>
                <span class="text-[20px]">${tag.emoji || ''}</span>
                <span class="text-[14px] font-medium text-gray-900">${escapeHtml(tag.name)}</span>
            </div>
            ${tag.editable ? `
                <div class="flex items-center gap-1 ml-2">
                    <button onclick="startEditTag('${tag.id}')" class="w-8 h-8 rounded-lg hover:bg-blue-50 flex items-center justify-center text-gray-400 hover:text-blue-500 transition btn-press" title="编辑">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    ${tag.deletable ? `
                        <button onclick="deleteTag('${tag.id}')" class="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition btn-press" title="删除">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                    ` : ''}
                </div>
            ` : ''}
        </div>
    `).join('');

    bindTagDragEvents();
}

function bindTagDragEvents() {
    const tagItems = document.querySelectorAll('.tag-manage-item');
    let draggedItem = null;

    tagItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = item;
            item.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
            // 读取 DOM 顺序，同步更新 tags 数组（排除 'all'）
            const list = document.getElementById('tagManageList');
            const newOrder = Array.from(list.querySelectorAll('.tag-manage-item')).map(el => el.dataset.id);
            const allTag = tags.find(t => t.id === 'all');
            const otherTags = newOrder.map(id => tags.find(t => t.id === id)).filter(Boolean);
            tags = [allTag, ...otherTags];
            saveTags();
            renderTabBar();
            draggedItem = null;
        });
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!draggedItem || draggedItem === item) return;
            const rect = item.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            if (e.clientY < midY) item.parentNode.insertBefore(draggedItem, item);
            else item.parentNode.insertBefore(draggedItem, item.nextSibling);
        });
    });
}

function renameTag(tagId, newName) {
    const tag = tags.find(t => t.id === tagId);
    if (!tag || !tag.editable) return;
    const oldName = tag.name;
    tag.name = newName.trim() || oldName;
    saveTags();
    items.forEach(item => { if (item.type === oldName) item.type = tag.name; });
    saveItems();
    renderTabBar();
    renderFeed();
    showToast('分类名称已更新');
}

let pendingDeleteTagId = null;

function deleteTag(tagId) {
    const tag = tags.find(t => t.id === tagId);
    if (!tag || !tag.deletable) { showToast('该分类不可删除'); return; }
    pendingDeleteTagId = tagId;
    const count = items.filter(i => i.type === tag.name).length;
    document.getElementById('deleteTagDesc').innerHTML = count > 0
        ? `注意：该分类下的 <b>${count}</b> 条灵感将变为「未分类」`
        : '确定删除此分类？';
    document.getElementById('deleteTagModal').classList.remove('hidden');
    // 垃圾桶特效（只动 SVG 图标，不动圆底，循环直到弹窗关闭）
    const iconSvg = document.getElementById('deleteTagIcon');
    if (iconSvg) {
        iconSvg.getAnimations().forEach(a => a.cancel());
        iconSvg.animate([
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(-20deg) scale(0.3)', offset: 0.2 },
            { transform: 'rotate(15deg) scale(0.6)', offset: 0.45 },
            { transform: 'rotate(-8deg) scale(1.15)', offset: 0.7 },
            { transform: 'rotate(0deg) scale(1)' }
        ], { duration: 1500, iterations: Infinity, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
    }
}
function closeDeleteTagModal() {
    const iconSvg = document.getElementById('deleteTagIcon');
    if (iconSvg) iconSvg.getAnimations().forEach(a => a.cancel());
    document.getElementById('deleteTagModal').classList.add('hidden'); pendingDeleteTagId = null;
}
function confirmDeleteTag() {
    if (!pendingDeleteTagId) return;
    const tag = tags.find(t => t.id === pendingDeleteTagId);
    tags = tags.filter(t => t.id !== pendingDeleteTagId);
    // 确保"未分类"tag存在（按名字匹配，不匹配emoji）
    if (!tags.find(t => t.name === '未分类')) {
        tags.push({ id: 'tag_uncategorized_' + Date.now(), name: '未分类', emoji: '📋', editable: false, deletable: false, system: true });
    }
    saveTags();
    if (tag) items.forEach(item => { if (item.type === tag.name) item.type = '未分类'; });
    saveItems();
    closeDeleteTagModal();
    renderTagManageList();
    renderTabBar();
    renderFeed();
    showFabCheckmark();
    showToast('分类已删除');
}

// ===== 编辑分类（铅笔按钮）=====
function startEditTag(tagId) {
    const tag = tags.find(t => t.id === tagId);
    if (!tag || !tag.editable) return;
    editTagId = tagId;
    editTagEmoji = tag.emoji || '🏷️';
    document.getElementById('editTagEmojiBtn').textContent = editTagEmoji;
    document.getElementById('editTagName').value = tag.name;
    document.getElementById('editTagArea').classList.remove('hidden');
    document.getElementById('addTagArea').classList.add('hidden');
    setTimeout(() => document.getElementById('editTagName').focus(), 100);
}

function confirmEditTag() {
    if (!editTagId) return;
    const tag = tags.find(t => t.id === editTagId);
    if (!tag) return;
    const newName = document.getElementById('editTagName').value.trim();
    if (!newName) { showToast('请输入分类名称'); return; }
    const oldName = tag.name;
    tag.name = newName;
    tag.emoji = editTagEmoji;
    saveTags();
    // 同步更新已有灵感的分类名
    items.forEach(item => { if (item.type === oldName) item.type = newName; });
    saveItems();
    document.getElementById('editTagArea').classList.add('hidden');
    editTagId = null;
    renderTagManageList();
    renderTabBar();
    renderFeed();
    showToast('分类已更新');
}

function cancelEditTag() {
    document.getElementById('editTagArea').classList.add('hidden');
    editTagId = null;
}

function showAddTagInput() {
    const area = document.getElementById('addTagArea');
    area.classList.toggle('hidden');
    if (!area.classList.contains('hidden')) {
        newTagEmoji = '🏷️';
        document.getElementById('newTagEmojiBtn').textContent = newTagEmoji;
        document.getElementById('newTagName').value = '';
        document.getElementById('newTagName').focus();
    }
}

function addNewTag() {
    const name = document.getElementById('newTagName').value.trim();
    if (!name) { showToast('请输入分类名称'); return; }
    if (tags.find(t => t.name === name)) { showToast('该分类已存在'); return; }
    const newTag = {
        id: 'tag_' + Date.now(),
        name: name,
        emoji: newTagEmoji,
        editable: true,
        deletable: true
    };
    tags.push(newTag);
    saveTags();
    document.getElementById('newTagName').value = '';
    document.getElementById('addTagArea').classList.add('hidden');
    renderTagManageList();
    renderTabBar();
    showToast('分类已添加');
}

// ===== 时间排序（三态切换）=====
function toggleTimeSort() {
    timeSortMode = (timeSortMode + 1) % 3;
    localStorage.setItem('gator_time_sort', timeSortMode);
    // SVG 切换过渡特效
    const svg = document.getElementById('timeSortSvg');
    if (svg) {
        svg.style.transition = 'transform 0.25s ease, opacity 0.15s ease';
        svg.style.transform = 'scale(0.7) rotate(-90deg)';
        svg.style.opacity = '0';
        setTimeout(() => {
            updateTimeSortBtn();
            svg.style.transform = 'scale(0.7) rotate(90deg)';
            requestAnimationFrame(() => {
                svg.style.transform = 'scale(1) rotate(0deg)';
                svg.style.opacity = '1';
            });
        }, 150);
    } else {
        updateTimeSortBtn();
    }
    renderFeed();
    // 震动动画
    const btn = document.getElementById('timeSortIconBtn');
    if (btn) {
        btn.classList.remove('sort-bounce');
        void btn.offsetWidth;
        btn.classList.add('sort-bounce');
    }
    if (timeSortMode === 1) showToast('按时间排序：新 → 旧');
    else if (timeSortMode === 2) showToast('按时间排序：旧 → 新');
    else showToast('已取消时间排序');
}

function updateTimeSortBtn() {
    const theme = THEMES[currentTheme] || THEMES.blue;
    const svg = document.getElementById('timeSortSvg');
    const btn = document.getElementById('timeSortIconBtn');
    if (!svg || !btn) return;

    if (timeSortMode === 1) {
        // 新→旧：箭头朝下
        svg.style.color = theme.primaryDark;
        btn.style.background = theme.primaryLight;
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>';
    } else if (timeSortMode === 2) {
        // 旧→新：箭头朝上（翻转箭头部分）
        svg.style.color = theme.primaryDark;
        btn.style.background = theme.primaryLight;
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h18m-4 4l4 4m0 0l4-4m-4 4V0"/>';
    } else {
        // 默认：纯排序线，无箭头
        svg.style.color = '#9CA3AF';
        btn.style.background = '';
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h6"/>';
    }
}

// ===== AI 功能（开发中）=====
function openAIFeature() {
    showToast('🤖 AI 功能正在开发中，敬请期待');
}

// ===== 添加（分类联动当前 tag）=====
function openInputModal() {
    document.getElementById('inputModal').classList.remove('hidden');
    // 根据当前选中的 tag 设置默认分类
    if (currentFilter.tab !== 'all') {
        const tag = tags.find(t => t.id === currentFilter.tab);
        if (tag) selectedType = tag.name;
    } else {
        selectedType = '效率';
    }
    updateTypeButtons();
    currentEmoji = '💡';
    document.getElementById('inputEmojiBtn').textContent = currentEmoji;
    document.getElementById('titleInput').value = '';
    document.getElementById('contentInput').value = '';
    renderInputTypeList();
    // 隐藏内联新增区域
    document.getElementById('inlineAddTagArea').classList.add('hidden');
    setTimeout(() => document.getElementById('titleInput').focus(), 100);
}
function closeInputModal() {
    document.getElementById('inputModal').classList.add('hidden');
    document.getElementById('titleInput').value = '';
    document.getElementById('contentInput').value = '';
    document.getElementById('inlineAddTagArea').classList.add('hidden');
    selectedType = '效率'; updateTypeButtons();
}

function renderInputTypeList() {
    const container = document.getElementById('inputTypeList');
    if (!container) return;
    const theme = THEMES[currentTheme] || THEMES.blue;

    // 渲染分类标签
    let html = tags.filter(t => t.id !== 'all').map(tag => {
        const isSelected = tag.name === selectedType;
        return `<button onclick="selectType('${tag.name}')" class="type-tag px-4 py-2 rounded-full text-[13px] whitespace-nowrap border border-transparent"
            data-type="${tag.name}"
            style="background: ${isSelected ? theme.primary : theme.primaryFaint}; color: ${isSelected ? '#fff' : theme.primaryDark}">
            ${tag.emoji || ''} ${tag.name}
        </button>`;
    }).join('');

    // 在末尾添加固定的 "+" 按钮（flex-shrink-0）
    html += `<button onclick="showInlineAddTagArea()" class="type-tag px-4 py-2 rounded-full text-[13px] whitespace-nowrap border border-dashed border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 transition flex-shrink-0" style="background: transparent; color: #9ca3af;">+</button>`;

    container.innerHTML = html;
}

// 显示内联新增分类区域
function showInlineAddTagArea() {
    document.getElementById('inlineAddTagArea').classList.remove('hidden');
    inlineTagEmoji = '🏷️';
    document.getElementById('inlineTagEmojiBtn').textContent = inlineTagEmoji;
    document.getElementById('inlineTagName').value = '';
    setTimeout(() => document.getElementById('inlineTagName').focus(), 100);
}

// 确认内联新增分类
function confirmInlineAddTag() {
    const name = document.getElementById('inlineTagName').value.trim();
    if (!name) { showToast('请输入分类名称'); return; }
    if (tags.find(t => t.name === name)) { showToast('该分类已存在'); return; }
    const newTag = {
        id: 'tag_' + Date.now(),
        name: name,
        emoji: inlineTagEmoji,
        editable: true,
        deletable: true
    };
    tags.push(newTag);
    saveTags();
    // 隐藏输入区
    document.getElementById('inlineAddTagArea').classList.add('hidden');
    // 选中新分类
    selectedType = name;
    // 刷新列表
    renderInputTypeList();
    updateTypeButtons();
    showToast('分类已添加');
}

function selectType(type) { selectedType = type; updateTypeButtons(); }
function updateTypeButtons() {
    const theme = THEMES[currentTheme] || THEMES.blue;
    document.querySelectorAll('.type-tag').forEach(btn => {
        if (btn.dataset.type === selectedType) { btn.style.background = theme.primary; btn.style.color = '#fff'; }
        else if (btn.dataset.type) { btn.style.background = theme.primaryFaint; btn.style.color = theme.primaryDark; }
    });
}
function addItem() {
    const title = document.getElementById('titleInput').value.trim();
    const content = document.getElementById('contentInput').value.trim();
    if (!title && !content) { showToast('请输入内容'); return; }
    const fullTitle = currentEmoji + ' ' + (title || '新记录');
    items.unshift({ id: 'item_' + Date.now(), title: fullTitle, content: content || '', type: selectedType || '效率', createdAt: new Date().toISOString() });
    saveItems(); renderFeed(); showFabCheckmark(); closeInputModal();
    showToast('已添加到 ' + getCurrentNotebookName());
}

// ===== 删除确认（灵感） =====
function showDeleteModal(id, e) {
    if (e) e.stopPropagation();
    if (currentSlidedCard) closeSlidedCard(currentSlidedCard);
    deleteTargetId = id;
    const item = items.find(i => i.id === id);
    const nameEl = document.getElementById('deleteItemName');
    if (item && item.title) { nameEl.textContent = item.title; nameEl.classList.remove('hidden'); }
    else nameEl.classList.add('hidden');
    document.getElementById('deleteModalTitle').textContent = '删除此灵感？';
    document.getElementById('deleteModalDesc').textContent = '删除后可在回收站恢复';
    document.getElementById('deleteModal').classList.remove('hidden');
    // 垃圾桶特效（只动 SVG 图标，不动圆底，循环直到弹窗关闭）
    const iconSvg = document.getElementById('deleteIcon');
    if (iconSvg) {
        iconSvg.getAnimations().forEach(a => a.cancel());
        iconSvg.animate([
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(-20deg) scale(0.3)', offset: 0.2 },
            { transform: 'rotate(15deg) scale(0.6)', offset: 0.45 },
            { transform: 'rotate(-8deg) scale(1.15)', offset: 0.7 },
            { transform: 'rotate(0deg) scale(1)' }
        ], { duration: 1500, iterations: Infinity, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
    }
}
function closeDeleteModal() {
    const iconSvg = document.getElementById('deleteIcon');
    if (iconSvg) iconSvg.getAnimations().forEach(a => a.cancel());
    document.getElementById('deleteModal').classList.add('hidden'); deleteTargetId = null;
}
function confirmDelete() {
    if (!deleteTargetId) { closeDeleteModal(); return; }
    const item = items.find(i => i.id === deleteTargetId);
    if (item) moveToRecycleBin(item);
    items = items.filter(i => i.id !== deleteTargetId);
    saveItems(); renderFeed(); showFabCheckmark(); showToast('已删除'); closeDeleteModal(); checkUncategorizedEmpty();
}

// ===== 灵感详情/编辑 =====
function showDetailModal(id, targetImgIdx) {
    detailTargetId = id;
    detailTargetImgIdx = targetImgIdx || 0;
    const item = items.find(i => i.id === id);
    if (!item) return;
    
    const match = item.title.match(/^(\S+)\s+(.*)$/);
    if (match) { detailEmoji = match[1]; document.getElementById('detailTitle').value = match[2] || ''; }
    else { detailEmoji = '💡'; document.getElementById('detailTitle').value = item.title || ''; }
    document.getElementById('detailEmojiBtn').textContent = detailEmoji;
    document.getElementById('detailContent').value = item.content || '';
    detailOriginalEmoji = detailEmoji;
    detailOriginalTitle = document.getElementById('detailTitle').value.trim();
    detailOriginalContent = item.content || '';
    const isUncategorized = item.type === '未分类';
    detailSelectedType = isUncategorized ? '' : (item.type || '效率');
    renderDetailTypeList();
    updateDetailTypeButtons();
    updatePinBtnState(item.pinned);
    
    if (readingMode === 'note' && fullscreenReading) {
        showNoteFullscreenDetail(item, detailTargetImgIdx);
        return;
    }
    
    if (fullscreenReading) {
        showImageFullscreenDetail(item, detailTargetImgIdx);
        return;
    }
    
    const allImgMatches = item.content ? [...item.content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)] : [];
    const allImageUrls = allImgMatches.map(m => m[2]);
    const allOriginalUrls = allImgMatches.map(m => {
        const altText = m[1] || '';
        if (altText.indexOf('ORIGINAL:') === 0) {
            return altText.substring('ORIGINAL:'.length);
        }
        return null;
    });
    const previewTitle = match ? match[2] || '' : item.title || '';
    const previewTime = formatTime(item.updatedAt || item.createdAt);
    const previewBody = item.content ? item.content.replace(/!\[[^\]]*\]\([^)]+\)/g, '').replace(/\s+/g, ' ').trim() : '';

    // 渲染 HTML 预览（与全屏编辑器一致）
    const previewEl = document.getElementById('detailContentPreview');
    if (previewEl) {
        previewEl.innerHTML = markdownToHtml(item.content || '');
        // 给内容中的图片添加点击事件，实现多图轮播预览
        previewEl.querySelectorAll('img').forEach((imgEl, idx) => {
            imgEl.style.cursor = 'zoom-in';
            imgEl.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openImagePreview(imgEl.src, allOriginalUrls[idx] || null, allImageUrls, allOriginalUrls, idx, previewTitle, previewTime, previewBody);
            });
        });
        // 底部留白
        initBottomSpacer('detailContentPreview', null);
        // 打开时滚轮默认到最顶部
        previewEl.scrollTop = 0;
        // 如果指定了目标图片索引，滚动到该图片
        if (detailTargetImgIdx > 0) {
            setTimeout(() => {
                const imgs = previewEl.querySelectorAll('img');
                if (imgs[detailTargetImgIdx]) {
                    imgs[detailTargetImgIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 200);
        }
    }
    document.getElementById('detailModal').classList.remove('hidden');
    // 详情页 FAB 菜单：鼠标移开时播放 x→+ 旋转动画并收起
    const detailFabBtn = document.getElementById('detailFabBtn');
    if (detailFabBtn) {
        detailFabBtn.addEventListener('mouseleave', function() {
            const menu = document.getElementById('detailActionMenu');
            const icon = document.getElementById('detailFabIcon');
            if (!menu || !icon) return;
            const isOpen = !menu.classList.contains('opacity-0');
            if (isOpen) {
                // 取消之前的 CSS 动画，避免冲突
                icon.getAnimations().forEach(a => a.cancel());
                // x→+ 非线性旋转动画
                const anim = icon.animate([
                    { transform: 'rotate(45deg) scale(1)' },
                    { transform: 'rotate(135deg) scale(0.5)', offset: 0.4 },
                    { transform: 'rotate(-20deg) scale(1.1)', offset: 0.7 },
                    { transform: 'rotate(0deg) scale(1)' }
                ], { duration: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' });
                anim.onfinish = () => {
                    icon.getAnimations().forEach(a => a.cancel());
                    icon.style.transform = 'rotate(0deg)';
                    menu.classList.add('opacity-0', 'pointer-events-none');
                    menu.style.transform = 'translateY(10px)';
                };
            }
        });
    }
}

// ===== note模式 ↔ 图片查看器 索引同步机制 =====
// 全局同步对象：note模式打开图片预览时写入，关闭时读取
window._notePreviewSync = null; // { slider, dotsEl, counterEl, prevBtn, nextBtn, total, currentIdx }

// 全局函数：note模式图片轮播定位（供 onCloseCallback 等外部调用）
function noteSlideToGlobal(idx, animate) {
    const sync = window._notePreviewSync;
    if (!sync || sync.total === 0) return;
    if (idx < 0 || idx >= sync.total) return;
    sync.currentIdx = idx;
    const slider = sync.slider;
    if (!slider) return;
    if (animate === false) {
        const old = slider.style.transition;
        slider.style.transition = 'none';
        slider.style.transform = 'translateX(-' + (idx * 100) + '%)';
        void slider.offsetWidth;
        slider.style.transition = old;
    } else {
        slider.style.transform = 'translateX(-' + (idx * 100) + '%)';
    }
    if (sync.dotsEl) {
        sync.dotsEl.querySelectorAll('.note-img-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
    }
    if (sync.counterEl) sync.counterEl.textContent = (idx + 1) + '/' + sync.total;
    if (sync.prevBtn) {
        if (idx === 0) { sync.prevBtn.classList.add('dimmed'); } else { sync.prevBtn.classList.remove('dimmed'); }
    }
    if (sync.nextBtn) {
        if (idx === sync.total - 1) { sync.nextBtn.classList.add('dimmed'); } else { sync.nextBtn.classList.remove('dimmed'); }
    }
}

// 重置note模式画廊按钮的淡出状态（关闭图片预览后调用）
function resetNoteGalleryBtns() {
    const galleryBtns = document.querySelectorAll('#noteFullscreenModal .note-gallery-btn');
    galleryBtns.forEach(b => b.classList.remove('note-gallery-faded'));
    if (galleryBtnFadeTimer) clearTimeout(galleryBtnFadeTimer);
    galleryBtnFadeTimer = setTimeout(() => {
        galleryBtns.forEach(b => b.classList.add('note-gallery-faded'));
    }, 3000);
}

function showNoteFullscreenDetail(item, targetImgIdx) {
    document.getElementById('noteFullscreenModal').classList.remove('hidden');

    const match = item.title.match(/^(\S+)\s+(.*)$/);
    const emoji = match ? match[1] : '💡';
    const title = match ? match[2] || '' : item.title || '';
    const tag = tags.find(t => t.name === item.type);
    const tagEmoji = tag ? tag.emoji : '💡';
    const tagName = item.type || '未分类';
    const timeStr = formatTime(item.updatedAt || item.createdAt);
    const desiredIdx = targetImgIdx || 0;

    // 保存当前 item 引用，供 emoji/分类选择器使用
    window.currentFullscreenItem = item;

    // 提取所有图片（支持原图信息）
    const allImgMatches = item.content ? [...item.content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)] : [];
    const allImageUrls = allImgMatches.map(m => m[2]);
    const hasImages = allImageUrls.length > 0;

    // ========== 布局切换：有图→画廊式，无图→紧凑 ==========
    const headerCompact = document.getElementById('noteFullscreenHeaderCompact');
    const dividerCompact = document.getElementById('noteFullscreenDividerCompact');
    const headerGallery = document.getElementById('noteFullscreenHeaderGallery');
    const galleryTitle = document.getElementById('noteFullscreenGalleryTitle');
    const floatEditBtn = document.getElementById('note-img-float-edit');
    const imgWrapEl = document.getElementById('note-img-wrap');

    if (hasImages) {
        if (headerCompact) headerCompact.classList.add('hidden');
        if (dividerCompact) dividerCompact.classList.add('hidden');
        if (galleryTitle) {
            galleryTitle.classList.remove('hidden');
            document.getElementById('noteFullscreenGalleryEmojiBtn').textContent = emoji;
            document.getElementById('noteFullscreenGalleryTitleText').textContent = title;
            document.getElementById('noteFullscreenGalleryTypeBtn').textContent = tagEmoji + ' ' + tagName;
            document.getElementById('noteFullscreenGalleryTime').textContent = timeStr;
        }
        if (imgWrapEl) {
            imgWrapEl.classList.remove('hidden'); // 移除hidden类，不再依赖内联样式覆盖
            imgWrapEl.style.display = 'block';
        }
        setupGalleryBtnFade();
    } else {
        if (headerCompact) headerCompact.classList.remove('hidden');
        if (dividerCompact) dividerCompact.classList.remove('hidden');
        if (galleryTitle) galleryTitle.classList.add('hidden');
        if (imgWrapEl) {
            imgWrapEl.classList.remove('hidden'); // 移除hidden类
            imgWrapEl.style.display = 'block';
        }
        document.getElementById('noteFullscreenEmojiBtn').textContent = emoji;
        document.getElementById('noteFullscreenTitle').textContent = title;
        const typeEl2 = document.getElementById('noteFullscreenTypeBtn');
        if (typeEl2) typeEl2.textContent = tagEmoji + ' ' + tagName;
        const timeEl2 = document.getElementById('noteFullscreenTime2');
        if (timeEl2) timeEl2.textContent = timeStr;
        clearGalleryBtnFade();
    }
    const allOriginalUrls = allImgMatches.map(m => {
        const altText = m[1] || '';
        if (altText.indexOf('ORIGINAL:') === 0) {
            return altText.substring('ORIGINAL:'.length);
        }
        return null;
    });

    // 图片轮播区域 —— 与首页卡片完全一致的交互
    const slider = document.getElementById('note-img-slider');
    const wrap = document.getElementById('note-img-wrap');
    const dotsEl = document.getElementById('note-img-dots');
    const counterEl = document.getElementById('note-img-counter');
    const prevBtn = document.getElementById('note-img-nav-prev');
    const nextBtn = document.getElementById('note-img-nav-next');

    // 初始化全局同步对象：note模式 ↔ 图片查看器索引同步
    window._notePreviewSync = {
        slider: slider,
        dotsEl: dotsEl,
        counterEl: counterEl,
        prevBtn: prevBtn,
        nextBtn: nextBtn,
        total: allImageUrls.length,
        currentIdx: 0
    };

    function noteSlideTo(idx, animate) {
        if (allImageUrls.length === 0) return;
        if (idx < 0 || idx >= allImageUrls.length) return;
        window._notePreviewSync.currentIdx = idx;
        // 使用百分比定位，避免 wrap.offsetWidth 不可靠导致定位错误
        if (animate === false) {
            const old = slider.style.transition;
            slider.style.transition = 'none';
            slider.style.transform = 'translateX(-' + (idx * 100) + '%)';
            void slider.offsetWidth;
            slider.style.transition = old;
        } else {
            slider.style.transform = 'translateX(-' + (idx * 100) + '%)';
        }
        if (dotsEl) {
            dotsEl.querySelectorAll('.note-img-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === idx);
            });
        }
        if (counterEl) counterEl.textContent = (idx + 1) + '/' + allImageUrls.length;
        if (prevBtn) {
            if (idx === 0) { prevBtn.classList.add('dimmed'); } else { prevBtn.classList.remove('dimmed'); }
        }
        if (nextBtn) {
            if (idx === allImageUrls.length - 1) { nextBtn.classList.add('dimmed'); } else { nextBtn.classList.remove('dimmed'); }
        }
    }

    function renderNoteImages() {
        if (allImageUrls.length === 0) {
            if (wrap) {
                wrap.classList.add('note-no-image');
                wrap.style.display = 'block';
            }
            if (slider) slider.style.display = 'none';
            if (dotsEl) dotsEl.style.display = 'none';
            if (counterEl) counterEl.style.display = 'none';
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }
        if (wrap) {
            wrap.classList.remove('note-no-image');
            wrap.style.display = 'block';
        }
        slider.innerHTML = allImageUrls.map(url =>
            '<img src="' + url + '" decoding="async" data-action="preview" style="cursor:zoom-in;">'
        ).join('');

        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';

        if (allImageUrls.length > 1) {
            if (dotsEl) {
                dotsEl.style.display = 'flex';
                dotsEl.innerHTML = allImageUrls.map((_, i) =>
                    '<div class="note-img-dot ' + (i === 0 ? 'active' : '') + '" data-dot-idx="' + i + '"></div>'
                ).join('');
                dotsEl.querySelectorAll('.note-img-dot').forEach(dot => {
                    dot.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        const targetIdx = parseInt(this.getAttribute('data-dot-idx'));
                        noteSlideTo(targetIdx);
                    });
                });
            }
            if (counterEl) counterEl.style.display = 'block';
        } else {
            if (dotsEl) dotsEl.style.display = 'none';
            if (counterEl) counterEl.style.display = 'none';
        }

        // 初始化: 先瞬间定位到 0，再带动画滑到 desiredIdx
        noteSlideTo(0, false);
        if (desiredIdx > 0 && allImageUrls.length > 1) {
            setTimeout(() => noteSlideTo(desiredIdx, true), 200);
        } else if (desiredIdx > 0) {
            noteSlideTo(desiredIdx, false);
        }
    }

    renderNoteImages();

    // 左箭头
    if (prevBtn) {
        prevBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            const curIdx = window._notePreviewSync ? window._notePreviewSync.currentIdx : 0;
            if (curIdx > 0) noteSlideTo(curIdx - 1);
        };
    }
    // 右箭头
    if (nextBtn) {
        nextBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            const curIdx = window._notePreviewSync ? window._notePreviewSync.currentIdx : 0;
            if (curIdx < allImageUrls.length - 1) noteSlideTo(curIdx + 1);
        };
    }

    // 图片点击 → 打开大图预览
    // 使用全局同步机制：onCloseCallback 不再依赖闭包中的 noteCurrentIdx
    slider.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const curIdx = window._notePreviewSync ? window._notePreviewSync.currentIdx : 0;
        const bodyText = item.content ? item.content.replace(/!\[[^\]]*\]\([^)]+\)/g, '').replace(/\s+/g, ' ').trim() : '';
        // 设置关闭回调：使用全局函数同步索引 + 重置按钮
        imagePreviewState.onCloseCallback = function(finalIdx) {
            // 用全局函数同步note模式图片索引
            noteSlideToGlobal(finalIdx, false);
            // 重置返回/编辑按钮：移除faded状态
            actionBtns.forEach(btn => btn.classList.remove('faded'));
            resetActionBtnState();
            // 重置画廊按钮（返回、编辑）：移除faded状态，重新开始fade计时
            resetNoteGalleryBtns();
        };
        openImagePreview(allImageUrls[curIdx], allOriginalUrls[curIdx] || null, allImageUrls, allOriginalUrls, curIdx, title, timeStr, bodyText);
    };

    // 返回/编辑按钮3档画风逻辑
    let idleTimer = null;
    const actionBtns = document.querySelectorAll('.note-img-action-btn');
    
    function resetActionBtnState() {
        actionBtns.forEach(btn => btn.classList.remove('faded'));
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            actionBtns.forEach(btn => btn.classList.add('faded'));
        }, 3000);
    }
    
    function clearIdleTimer() {
        if (idleTimer) {
            clearTimeout(idleTimer);
            idleTimer = null;
        }
    }
    
    // 鼠标在图片区域移动时重置状态
    if (wrap) {
        wrap.addEventListener('mousemove', function() {
            resetActionBtnState();
        });
        
        // 鼠标离开图片区域后开始计时
        wrap.addEventListener('mouseleave', function() {
            idleTimer = setTimeout(() => {
                actionBtns.forEach(btn => btn.classList.add('faded'));
            }, 3000);
        });
    }
    
    // 按钮hover时清除计时并恢复正常状态
    actionBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            clearIdleTimer();
            this.classList.remove('faded');
        });
        btn.addEventListener('mouseleave', function() {
            // 鼠标离开按钮后开始计时
            idleTimer = setTimeout(() => {
                actionBtns.forEach(b => b.classList.add('faded'));
            }, 3000);
        });
    });
    
    // 初始状态：3秒后变浅灰色
    resetActionBtnState();

    // 触摸滑动切换（左右滑动，带防抖锁）
    let noteTouchStartX = 0;
    let noteTouchStartY = 0;
    let noteSwipeLock = false;
    if (wrap) {
        wrap.addEventListener('touchstart', function(e) {
            noteTouchStartX = e.changedTouches[0].screenX;
            noteTouchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        wrap.addEventListener('touchend', function(e) {
            if (noteSwipeLock) return;
            const diffX = noteTouchStartX - e.changedTouches[0].screenX;
            const diffY = noteTouchStartY - e.changedTouches[0].screenY;
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                noteSwipeLock = true;
                const curIdx = window._notePreviewSync ? window._notePreviewSync.currentIdx : 0;
                if (diffX > 0 && curIdx < allImageUrls.length - 1) {
                    noteSlideTo(curIdx + 1);
                } else if (diffX < 0 && curIdx > 0) {
                    noteSlideTo(curIdx - 1);
                }
                setTimeout(() => { noteSwipeLock = false; }, 400);
            }
        }, { passive: true });
    }

    // 触控板双指横滑切换（累积位移阈值 → 一次一张，防止使劲滑直接跳到最后）
    if (wrap) {
        const nSwipeState = { lockUntil: 0, accumX: 0, direction: 0, threshold: 400 };
        wrap.addEventListener('wheel', function(e) {
            const absX = Math.abs(e.deltaX);
            const absY = Math.abs(e.deltaY);
            const now = Date.now();
            // 横向主导 → 累积位移切换图片，否则让正常纵向滚动
            if (absX > absY && absX > 10) {
                e.preventDefault();
                // 锁期间丢弃所有累积位移，防止锁过期后瞬间再触发
                if (nSwipeState.lockUntil > now) {
                    nSwipeState.accumX = 0;
                    return;
                }
                const dir = e.deltaX > 0 ? 1 : -1;
                if (dir !== nSwipeState.direction) {
                    nSwipeState.direction = dir;
                    nSwipeState.accumX = 0;
                }
                nSwipeState.accumX += absX;
                if (nSwipeState.accumX >= nSwipeState.threshold) {
                    nSwipeState.lockUntil = now + 500;
                    nSwipeState.accumX = 0;
                    nSwipeState.direction = 0;
                    const curIdx = window._notePreviewSync ? window._notePreviewSync.currentIdx : 0;
                    if (dir > 0 && curIdx < allImageUrls.length - 1) {
                        noteSlideTo(curIdx + 1);
                    } else if (dir < 0 && curIdx > 0) {
                        noteSlideTo(curIdx - 1);
                    }
                }
            }
        }, { passive: false });
    }

    // 窗口大小变化时重新计算
    window.addEventListener('resize', function() {
        if (allImageUrls.length > 0) {
            const curIdx = window._notePreviewSync ? window._notePreviewSync.currentIdx : 0;
            noteSlideTo(curIdx);
        }
    });

    // 正文（去掉markdown图片语法）
    const bodyEl = document.getElementById('noteFullscreenContent');
    const bodyContent = item.content ? item.content.replace(/!\[[^\]]*\]\([^)]+\)/g, '').trim() : '';
    if (bodyContent) {
        bodyEl.innerHTML = markdownToHtml(bodyContent);
    } else {
        bodyEl.innerHTML = '';
    }

    // 打开时滚轮默认到最顶部
    const contentEl = document.getElementById('noteFullscreenBodyWrap');
    if (contentEl) contentEl.scrollTop = 0;
}

// 画廊按钮 3s fade 逻辑
let galleryBtnFadeTimer = null;
function setupGalleryBtnFade() {
    clearGalleryBtnFade();
    const btns = document.querySelectorAll('#noteFullscreenModal .note-gallery-btn');
    btns.forEach(b => b.classList.remove('note-gallery-faded'));

    galleryBtnFadeTimer = setTimeout(() => {
        const bts = document.querySelectorAll('#noteFullscreenModal .note-gallery-btn');
        bts.forEach(b => b.classList.add('note-gallery-faded'));
    }, 2000);

    const handler = function() {
        const btsNow = document.querySelectorAll('#noteFullscreenModal .note-gallery-btn');
        btsNow.forEach(b => b.classList.remove('note-gallery-faded'));
        if (galleryBtnFadeTimer) clearTimeout(galleryBtnFadeTimer);
        galleryBtnFadeTimer = setTimeout(() => {
            btsNow.forEach(b => b.classList.add('note-gallery-faded'));
        }, 2000);
    };
    const wrapEl = document.getElementById('noteFullscreenModal');
    if (wrapEl) {
        wrapEl.addEventListener('mousemove', handler);
        wrapEl.addEventListener('click', handler);
    }
}
function clearGalleryBtnFade() {
    if (galleryBtnFadeTimer) {
        clearTimeout(galleryBtnFadeTimer);
        galleryBtnFadeTimer = null;
    }
}

// 保存预览模式中的修改（任务勾选、文本编辑、emoji、分类等）
function saveFullscreenChanges(mode) {
    const item = window.currentFullscreenItem;
    if (!item) return;

    let contentEl;
    if (mode === 'note') {
        contentEl = document.getElementById('noteFullscreenContent');
    } else if (mode === 'image') {
        contentEl = document.getElementById('imageFullscreenBody');
    }
    if (!contentEl) return;

    // 同步 checkbox 的 checked 属性到 HTML 属性（innerHTML 只读属性不读 DOM 状态）
    contentEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
            cb.setAttribute('checked', '');
        } else {
            cb.removeAttribute('checked');
        }
    });

    // 从预览 DOM 读取内容并转为 markdown
    const newBodyMd = htmlToMarkdown(contentEl.innerHTML).trim();

    // 重建完整 content（图片模式需要把图片 markdown 加回去）
    let fullContent;
    if (mode === 'image') {
        // 图片模式：图片在单独区域，需要拼回 content
        const allImgMatches = item.content ? [...item.content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)] : [];
        const imgMd = allImgMatches.map(m => m[0]).join('\n');
        fullContent = (imgMd ? imgMd + '\n\n' : '') + newBodyMd;
    } else {
        // note 模式：图片在轮播区域，也需要拼回
        const allImgMatches = item.content ? [...item.content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)] : [];
        const imgMd = allImgMatches.map(m => m[0]).join('\n');
        fullContent = (imgMd ? imgMd + '\n\n' : '') + newBodyMd;
    }

    // 比较是否有变化
    const oldContent = (item.content || '').trim();
    if (fullContent !== oldContent) {
        item.content = fullContent;
        item.updatedAt = new Date().toISOString();
        saveItems();
        return true;
    }
    return false;
}

// 只更新单张卡片，避免 renderFeed 重建整列表导致图片闪烁
function updateSingleCard(item) {
    if (!item) return;
    const oldCard = document.querySelector(`.card-wrapper[data-id="${item.id}"]`);
    if (!oldCard) { renderFeed(); return; } // 找不到就回退到全量渲染
    const tmp = document.createElement('div');
    tmp.innerHTML = createCardHTML(item);
    const newCard = tmp.firstElementChild;
    // 列表模式需要 position: relative
    if (currentLayout !== 'masonry') {
        newCard.style.setProperty('position', 'relative', 'important');
        newCard.style.width = '';
        newCard.style.transform = '';
    }
    oldCard.replaceWith(newCard);
    // 注：缩略图尺寸已在 createCardHTML 中根据内容长度设置，无需再测量 DOM
    bindCardEvents();
    // 瀑布流模式需要重新布局
    if (currentLayout === 'masonry') {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                layoutMasonry(document.getElementById('feedContainer'));
            });
        });
    }
}

function closeNoteFullscreenModal() {
    // 先立即隐藏弹窗，避免卡顿感
    document.getElementById('noteFullscreenModal').classList.add('hidden');
    // 重置note-img-wrap的hidden类，确保下次打开时状态正确
    const imgWrapEl = document.getElementById('note-img-wrap');
    if (imgWrapEl) {
        imgWrapEl.classList.add('hidden');
        imgWrapEl.style.display = '';
    }
    // 清除全局同步对象，防止残留引用
    window._notePreviewSync = null;
    // 延迟执行保存逻辑
    setTimeout(() => {
        const contentSaved = saveFullscreenChanges('note');
        const modified = _previewModified || contentSaved;
        if (modified) {
            showToast('相关修改已保存');
        }
        _previewModified = false;
        clearGalleryBtnFade();
        showFabCheckmark();
        if (modified) {
            // 只更新被修改的卡片，避免整列表重建导致图片闪烁
            updateSingleCard(window.currentFullscreenItem);
        }
    }, 100);
}

// 图文模式全屏预览
function showImageFullscreenDetail(item) {
    document.getElementById('imageFullscreenModal').classList.remove('hidden');

    const match = item.title.match(/^(\S+)\s+(.*)$/);
    const emoji = match ? match[1] : '💡';
    const title = match ? match[2] || '' : item.title || '';
    const tag = tags.find(t => t.name === item.type);
    const tagEmoji = tag ? tag.emoji : '💡';
    const tagName = item.type || '未分类';
    const timeStr = formatTime(item.updatedAt || item.createdAt);

    // 保存当前 item 引用，供 emoji/分类选择器使用
    window.currentFullscreenItem = item;

    document.getElementById('imageFullscreenEmojiBtn').textContent = emoji;
    document.getElementById('imageFullscreenTitle').textContent = title;
    document.getElementById('imageFullscreenTypeBtn').textContent = `${tagEmoji} ${tagName}`;
    document.getElementById('imageFullscreenTime').textContent = timeStr;

    // 提取所有图片（支持原图信息）
    const allImgMatches = item.content ? [...item.content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)] : [];
    const allImageUrls = allImgMatches.map(m => m[2]);
    const allOriginalUrls = allImgMatches.map(m => {
        const altText = m[1] || '';
        if (altText.indexOf('ORIGINAL:') === 0) {
            return altText.substring('ORIGINAL:'.length);
        }
        return null;
    });

    // 渲染图片（所有图片以卡片圆角形式显示，点击图片打开多图预览）
    const imagesWrap = document.getElementById('imageFullscreenImages');
    if (allImageUrls.length > 0) {
        const bodyText = item.content ? item.content.replace(/!\[[^\]]*\]\([^)]+\)/g, '').replace(/\s+/g, ' ').trim() : '';
        imagesWrap.innerHTML = allImageUrls.map((url, idx) => {
            return `<img src="${url}" decoding="async" data-idx="${idx}" style="width:100%; max-width:800px; border-radius:16px; cursor:zoom-in; transition:box-shadow 0.2s ease;" onmouseover="this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'" onmouseout="this.style.boxShadow='none'">`;
        }).join('');
        // 点击图片打开大图预览（支持原图切换）
        imagesWrap.querySelectorAll('img').forEach((imgEl, idx) => {
            imgEl.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                // 设置关闭回调：关闭预览后滚动到对应图片
                imagePreviewState.onCloseCallback = function(finalIdx) {
                    const contentEl = document.getElementById('imageFullscreenContent');
                    if (contentEl) {
                        const imgs = imagesWrap.querySelectorAll('img');
                        if (imgs[finalIdx]) {
                            imgs[finalIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                };
                openImagePreview(imgEl.src, allOriginalUrls[idx] || null, allImageUrls, allOriginalUrls, idx, title, timeStr, bodyText);
            });
        });
    } else {
        imagesWrap.innerHTML = '';
    }

    // 渲染正文（去除markdown图片语法）
    const bodyEl = document.getElementById('imageFullscreenBody');
    const bodyContent = item.content ? item.content.replace(/!\[[^\]]*\]\([^)]+\)/g, '').trim() : '';
    if (bodyContent) {
        bodyEl.innerHTML = markdownToHtml(bodyContent);
    } else {
        bodyEl.textContent = '';
    }

    // 滚轮默认在顶部
    const contentEl = document.getElementById('imageFullscreenContent');
    if (contentEl) contentEl.scrollTop = 0;
}

function closeImageFullscreenModal() {
    // 记录当前图片预览索引，用于返回详情页时滚动到对应位置
    const currentImgIdx = imagePreviewState.currentIdx || 0;
    // 先立即隐藏弹窗，避免卡顿感
    document.getElementById('imageFullscreenModal').classList.add('hidden');
    // 延迟执行保存和滚动逻辑，避免卡顿
    setTimeout(() => {
        showFabCheckmark();
        // 返回详情页时，滚动到对应图片
        const previewEl = document.getElementById('detailContentPreview');
        if (previewEl && currentImgIdx > 0) {
            const imgs = previewEl.querySelectorAll('img');
            if (imgs[currentImgIdx]) {
                imgs[currentImgIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        const contentSaved = saveFullscreenChanges('image');
        const modified = _previewModified || contentSaved;
        if (modified) {
            showToast('相关修改已保存');
        }
        _previewModified = false;
        if (modified) {
            updateSingleCard(window.currentFullscreenItem);
        }
    }, 100);
}
function closeDetailModal() {
    // 关闭前保存滚动位置
    const closedId = detailTargetId;
    const previewEl = document.getElementById('detailContentPreview');
    // 记录详情页中最后查看的图片索引，用于返回首页时层叠缩略图动画
    let lastViewedImgIdx = 0;
    if (previewEl) {
        if (closedId && previewEl) {
            if (!scrollPositionCache[closedId]) scrollPositionCache[closedId] = {};
            scrollPositionCache[closedId].previewScroll = previewEl.scrollTop;
            scrollPositionCache[closedId].timestamp = Date.now();
        }
        // 找到当前视口中最近的图片索引
        const imgs = previewEl.querySelectorAll('img');
        const containerRect = previewEl.getBoundingClientRect();
        let minDist = Infinity;
        imgs.forEach((img, idx) => {
            const rect = img.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const containerCenter = containerRect.top + containerRect.height / 2;
            const dist = Math.abs(center - containerCenter);
            if (dist < minDist) { minDist = dist; lastViewedImgIdx = idx; }
        });
    }
    // 关闭前自动保存（如果内容有变化）
    const hadChanges = hasUnsavedChangesDetail();
    autoSaveDetail();
    // 始终标记高亮（无论是否有变化），用于返回后定位
    if (closedId) {
        const item = items.find(i => i.id === closedId);
        if (item) item._highlight = true;
    }
    // 退出动画：面板下滑 + 遮罩淡出
    const modal = document.getElementById('detailModal');
    const backdrop = modal.querySelector('.bg-black\\/30');
    const panel = modal.querySelector('.modal-up');
    if (backdrop) { backdrop.style.transition = 'opacity 0.35s ease'; backdrop.style.opacity = '0'; }
    if (panel) { panel.style.transition = 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.35s ease'; panel.style.transform = 'translateY(100%)'; panel.style.opacity = '0'; }
    setTimeout(() => {
        modal.classList.add('hidden');
        if (backdrop) { backdrop.style.transition = ''; backdrop.style.opacity = ''; }
        if (panel) { panel.style.transition = ''; panel.style.transform = ''; panel.style.opacity = ''; }
        detailTargetId = null;
        showFabCheckmark();
        // 重置展开菜单
        const menu = document.getElementById('detailActionMenu');
        const icon = document.getElementById('detailFabIcon');
        if (menu) { menu.classList.add('opacity-0', 'pointer-events-none'); menu.style.transform = 'translateY(10px)'; }
        if (icon) { icon.style.transform = 'rotate(0deg)'; }
        // 只有内容确实变化了才重新渲染，否则只做高亮+滚动
        if (hadChanges || _detailNeedsRerender) {
            _detailNeedsRerender = false;
            renderFeed(true);
        } else if (closedId) {
            // 不重新渲染，直接定位高亮
            highlightCard(closedId);
        }
        // 返回首页时，层叠缩略图从当前图片索引动画回到第一张
        if (closedId && lastViewedImgIdx > 0) {
            animateStackThumbBack(closedId, lastViewedImgIdx);
        }
    }, 360);
}

// 直接高亮卡片并滚动到页面中间（不重新渲染）
function highlightCard(id) {
    const el = document.getElementById('card-' + id);
    if (!el) return;
    // 滚动到页面中间位置
    const rect = el.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const targetY = scrollY + rect.top - (window.innerHeight / 2 - rect.height / 2);
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    // 泛光高亮
    const theme = THEMES[currentTheme] || THEMES.blue;
    const compMatch = (theme.complementary || '').match(/#[0-9A-Fa-f]{6}/);
    const comp = compMatch ? compMatch[0] : '#F97316';
    const glow = `0 0 16px ${comp}44, 0 0 6px ${comp}22`;
    el.style.boxShadow = glow;
    el.style.outline = `1px solid ${comp}55`;
    el.style.outlineOffset = '-1px';
    el.animate([
        { boxShadow: '0 0 0px transparent', outlineColor: 'transparent' },
        { boxShadow: glow, outlineColor: comp + '55' }
    ], { duration: 300, easing: 'ease-out', fill: 'forwards' });
    setTimeout(() => {
        el.animate([
            { boxShadow: glow, outlineColor: comp + '55' },
            { boxShadow: '0 0 0px transparent', outlineColor: 'transparent' }
        ], { duration: 300, easing: 'ease-in', fill: 'forwards' }).onfinish = () => {
            el.style.boxShadow = '';
            el.style.outline = '';
            el.style.outlineOffset = '';
        };
    }, 2000);
}

// 层叠缩略图从指定图片索引动画回到第一张
function animateStackThumbBack(itemId, fromIdx) {
    // 层叠缩略图回滚动画（list 模式）
    const el = document.getElementById('cs-' + itemId);
    if (el) {
        const imagesAttr = el.dataset.images;
        if (imagesAttr) {
            const images = imagesAttr.split(',').map(u => decodeURIComponent(u));
            if (fromIdx > 0 && fromIdx < images.length) {
                el.dataset.currentIdx = fromIdx;
                csUpdateState(itemId, fromIdx, images);
                let idx = fromIdx;
                const step = () => {
                    idx--;
                    if (idx < 0) idx = 0;
                    el.dataset.currentIdx = idx;
                    csUpdateState(itemId, idx, images);
                    if (idx > 0) setTimeout(step, 80);
                };
                setTimeout(step, 100);
            }
        }
    }

    // masonry 卡片 slider 回滚：直接跳回第 0 张，跳过 transition 避免出现竖条
    const wrapper = document.getElementById('card-' + itemId);
    if (wrapper) {
        const imagesAttr = wrapper.dataset.images;
        if (imagesAttr) {
            const images = imagesAttr.split(',').map(decodeURIComponent);
            let idx = parseInt(wrapper.dataset.imgIdx || '0');
            if (idx > 0 && idx < images.length) {
                wrapper.dataset.imgIdx = 0;
                slideCardImg(itemId, 0, true);
                wrapper.querySelectorAll('.card-img-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === 0);
                });
                const counter = document.getElementById('card-img-counter-' + itemId);
                if (counter) counter.textContent = '1/' + images.length;
                updateCardNavState(itemId, 0, images.length);
            }
        }
    }
}

// 详情弹窗的未保存检测
function hasUnsavedChangesDetail() {
    if (!detailTargetId) return false;
    const item = items.find(i => i.id === detailTargetId);
    if (!item) return false;
    const title = (document.getElementById('detailTitle').value || '').trim();
    const content = (document.getElementById('detailContent').value || '').trim().replace(/\r\n/g, '\n');
    const origTitle = (detailOriginalTitle || '').trim();
    const origContent = (detailOriginalContent || '').trim().replace(/\r\n/g, '\n');
    return (detailEmoji !== detailOriginalEmoji) ||
           (title !== origTitle) ||
           (content !== origContent) ||
           (item.type !== detailSelectedType);
}

// 详情页底部大加号展开/收起菜单
function toggleDetailActionMenu() {
    const menu = document.getElementById('detailActionMenu');
    const icon = document.getElementById('detailFabIcon');
    if (!menu || !icon) return;
    const isOpen = !menu.classList.contains('opacity-0');
    if (isOpen) {
        // 取消 mouseleave 动画
        icon.getAnimations().forEach(a => a.cancel());
        menu.classList.add('opacity-0', 'pointer-events-none');
        menu.style.transform = 'translateY(10px)';
        icon.style.transform = 'rotate(0deg)';
    } else {
        // 取消 mouseleave 动画
        icon.getAnimations().forEach(a => a.cancel());
        menu.classList.remove('opacity-0', 'pointer-events-none');
        menu.style.transform = 'translateY(0)';
        icon.style.transform = 'rotate(45deg)';
    }
}

// 自动保存：仅当标题或正文有变化时才保存并更新时间戳
function autoSaveDetail() {
    if (!detailTargetId) return;
    const item = items.find(i => i.id === detailTargetId);
    if (!item) return;
    const title = document.getElementById('detailTitle').value.trim();
    const content = document.getElementById('detailContent').value.trim();
    if (!title && !content) return;
    const newTitle = detailEmoji + ' ' + (title || '新记录');
    const newContent = content || '';
    // 只有当 emoji、标题或正文发生变化时才更新时间
    const textChanged = (detailEmoji !== detailOriginalEmoji) ||
                        (title !== detailOriginalTitle) ||
                        (newContent !== detailOriginalContent);
    item.title = newTitle;
    item.content = newContent;
    item.type = detailSelectedType;
    if (textChanged) {
        item.updatedAt = new Date().toISOString();
    }
    saveItems();
}

// ===== 全屏编辑 =====
// ===== 底部留白：滚到内容底部时增加空白空间（参考备忘录 app） =====
function initBottomSpacer(wrapId, contentId) {
    const wrap = document.getElementById(wrapId);
    const content = document.getElementById(contentId);
    if (!wrap) return;
    const target = content || wrap; // 如果 contentId 为空，则 wrap 自身既是滚动容器也是内容容器

    // 移除旧的监听器和 spacer
    if (wrap._bottomSpacerHandler) {
        wrap.removeEventListener('scroll', wrap._bottomSpacerHandler);
    }
    const oldSpacer = target.querySelector('[data-bottom-spacer]');
    if (oldSpacer) oldSpacer.remove();

    // 获取最后一行文字的高度
    function getLastLineHeight() {
        const allChildren = target.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, div, span, blockquote');
        let lastTextEl = null;
        for (let i = allChildren.length - 1; i >= 0; i--) {
            const el = allChildren[i];
            if (el.dataset && (el.dataset.bottomSpacer || el.dataset.scrollSpacer)) continue;
            if (el.closest('[data-bottom-spacer]') || el.closest('[data-scroll-spacer]')) continue;
            if (el.textContent.trim()) {
                lastTextEl = el;
                break;
            }
        }
        if (!lastTextEl) return 40;
        const style = window.getComputedStyle(lastTextEl);
        const fontSize = parseFloat(style.fontSize) || 16;
        const lineHeight = parseFloat(style.lineHeight) || fontSize * 1.6;
        return lineHeight;
    }

    wrap._bottomSpacerHandler = function() {
        const spacer = target.querySelector('[data-bottom-spacer]');
        const threshold = 30;

        if (wrap.scrollTop + wrap.clientHeight >= wrap.scrollHeight - threshold) {
            const lastLineH = getLastLineHeight();
            const maxH = wrap.clientHeight * 0.4;
            const spacerH = Math.min(lastLineH, maxH);

            if (!spacer) {
                const newSpacer = document.createElement('div');
                newSpacer.dataset.bottomSpacer = 'true';
                newSpacer.style.height = spacerH + 'px';
                newSpacer.style.pointerEvents = 'none';
                newSpacer.setAttribute('contenteditable', 'false');
                target.appendChild(newSpacer);
            } else {
                spacer.style.height = spacerH + 'px';
            }
        } else {
            if (spacer) spacer.remove();
        }
    };

    wrap.addEventListener('scroll', wrap._bottomSpacerHandler);
}

// 编辑器是否被修改的标记（用于未保存检测）
let _editorDirty = false;
let _previewModified = false; // 预览模式修改标记（emoji/分类/任务勾选）

function openFullscreenEditor() {
    // 从预览模式进入编辑：先保存预览修改
    const noteModal = document.getElementById('noteFullscreenModal');
    const imageModal = document.getElementById('imageFullscreenModal');
    const isFromPreview = !noteModal.classList.contains('hidden') || !imageModal.classList.contains('hidden');
    if (isFromPreview && window.currentFullscreenItem) {
        const item = window.currentFullscreenItem;
        if (!noteModal.classList.contains('hidden')) {
            saveFullscreenChanges('note');
        } else if (!imageModal.classList.contains('hidden')) {
            saveFullscreenChanges('image');
        }
        // 如果 detailTargetId 未设置（直接从首页进入预览模式），需要初始化
        if (!detailTargetId) {
            detailTargetId = item.id;
        }
        // 同步最新内容到 detailContent
        const match = item.title.match(/^(\S+)\s+(.*)$/);
        if (match) { detailEmoji = match[1]; document.getElementById('detailTitle').value = match[2] || ''; }
        else { detailEmoji = '💡'; document.getElementById('detailTitle').value = item.title || ''; }
        document.getElementById('detailEmojiBtn').textContent = detailEmoji;
        document.getElementById('detailContent').value = item.content || '';
        detailOriginalEmoji = detailEmoji;
        detailOriginalTitle = document.getElementById('detailTitle').value.trim();
        detailOriginalContent = item.content || '';
        const isUncategorized = item.type === '未分类';
        detailSelectedType = isUncategorized ? '' : (item.type || '效率');
    }

    if (!detailTargetId) return;
    // 打开编辑器前先关闭当前的全屏预览弹窗（避免遮挡）
    document.getElementById('imageFullscreenModal').classList.add('hidden');
    document.getElementById('noteFullscreenModal').classList.add('hidden');
    document.getElementById('detailModal').classList.add('hidden');
    const modal = document.getElementById('fullscreenEditorModal');
    document.getElementById('fullscreenEmojiBtn').textContent = detailEmoji;
    document.getElementById('fullscreenTitle').value = document.getElementById('detailTitle').value;
    const content = document.getElementById('detailContent').value || '';
    // 将 markdown 转 HTML，并将 img 标签包装为编辑器图片容器
    document.getElementById('fullscreenEditor').innerHTML = wrapEditorImages(markdownToHtml(content));
    // 编辑器中任务文字需要可编辑（预览模式下是 contenteditable="false"）
    document.getElementById('fullscreenEditor').querySelectorAll('div[data-task] span').forEach(span => {
        span.contentEditable = 'true';
    });
    // 重置未保存标记
    _editorDirty = false;
    modal.classList.remove('hidden');
    // 打开时滚轮默认到最顶部（不再恢复上次位置）
    const wrap = document.getElementById('fullscreenEditorWrap');
    if (wrap) wrap.scrollTop = 0;
    // 清除工具栏高亮（默认无选中状态）
    setTimeout(() => {
        const sel = window.getSelection();
        sel.removeAllRanges();
        updateToolbarHighlight();
    }, 50);
    // 底部留白：滚到内容底部时增加空白空间
    initBottomSpacer('fullscreenEditorWrap', 'fullscreenEditor');
}

// ===== 未保存检测：基于修改标记（仅真实编辑才触发）=====
function hasUnsavedChanges() {
    return _editorDirty === true;
}

function showUnsavedModal() {
    document.getElementById('unsavedModal').classList.remove('hidden');
    // 编辑笔特效（循环旋转+缩放，参考删除确认框的垃圾桶动画）
    const iconSvg = document.getElementById('unsavedIcon');
    if (iconSvg) {
        iconSvg.getAnimations().forEach(a => a.cancel());
        iconSvg.animate([
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(-15deg) scale(0.85)', offset: 0.25 },
            { transform: 'rotate(10deg) scale(1.1)', offset: 0.5 },
            { transform: 'rotate(-5deg) scale(0.95)', offset: 0.75 },
            { transform: 'rotate(0deg) scale(1)' }
        ], { duration: 1200, iterations: Infinity, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
    }
}

function closeUnsavedModal() {
    const iconSvg = document.getElementById('unsavedIcon');
    if (iconSvg) iconSvg.getAnimations().forEach(a => a.cancel());
    document.getElementById('unsavedModal').classList.add('hidden');
}

function discardFullscreenEditor() {
    closeUnsavedModal();
    // 不保存：直接关闭编辑弹窗，然后关闭详情弹窗返回主页
    const modal = document.getElementById('fullscreenEditorModal');
    modal.classList.add('hidden');
    // 直接关闭详情页并返回主页（不高亮，因为用户选择放弃修改）
    closeDetailModal();
}

function saveAndCloseFullscreenEditor() {
    closeUnsavedModal();
    saveFullscreenEditor();
}

function _doCloseFullscreenEditor() {
    // 保存编辑界面的滚动位置
    const wrap = document.getElementById('fullscreenEditorWrap');
    if (detailTargetId && wrap) {
        if (!scrollPositionCache[detailTargetId]) scrollPositionCache[detailTargetId] = {};
        scrollPositionCache[detailTargetId].editorScroll = wrap.scrollTop;
        scrollPositionCache[detailTargetId].timestamp = Date.now();
    }
    const modal = document.getElementById('fullscreenEditorModal');
    modal.classList.add('hidden');

    // 如果有未保存的修改，同步到详情页
    if (hasUnsavedChanges()) {
        document.getElementById('detailEmojiBtn').textContent = detailEmoji;
        document.getElementById('detailTitle').value = document.getElementById('fullscreenTitle').value;
        const mdContent = htmlToMarkdown(document.getElementById('fullscreenEditor').innerHTML);
        document.getElementById('detailContent').value = mdContent;
        // 同步更新详情预览
        const previewEl = document.getElementById('detailContentPreview');
        if (previewEl) {
            previewEl.innerHTML = markdownToHtml(mdContent);
            initBottomSpacer('detailContentPreview', null);
        }
    }

    // 直接关闭详情页并返回主页+高亮
    const closedId = detailTargetId;
    if (closedId) {
        const item = items.find(i => i.id === closedId);
        if (item) item._highlight = true;
    }
    closeDetailModal();
}

function closeFullscreenEditor() {
    if (hasUnsavedChanges()) {
        showUnsavedModal();
    } else {
        _doCloseFullscreenEditor();
    }
}

function saveFullscreenEditor() {
    const title = document.getElementById('fullscreenTitle').value.trim();
    const content = htmlToMarkdown(document.getElementById('fullscreenEditor').innerHTML);
    if (!title && !content) { showToast('请输入内容'); return; }

    if (detailTargetId) {
        document.getElementById('detailTitle').value = document.getElementById('fullscreenTitle').value;
        document.getElementById('detailContent').value = content;
        // 直接更新 item 并标记高亮
        const item = items.find(i => i.id === detailTargetId);
        if (item) {
            item.title = detailEmoji + ' ' + (title || '新记录');
            item.content = content || '';
            item.type = detailSelectedType;
            item.updatedAt = new Date().toISOString();
            item._highlight = true;
            saveItems();
        }
        _editorDirty = false; // 保存后清除修改标记
        closeFullscreenEditor();
        showToast('已保存');
        checkUncategorizedEmpty();
        renderFeed();
    } else {
        const newItem = {
            id: 'item_' + Date.now(),
            title: detailEmoji + ' ' + (title || '新记录'),
            content: content || '',
            type: detailSelectedType,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            pinned: false
        };
        items.unshift(newItem);
        saveItems(); renderFeed(); renderTabBar(); showFabCheckmark(); showToast('已添加');
        _editorDirty = false;
        closeFullscreenEditor();
    }
}

function openFullscreenEditorFromInput() {
    closeInputModal();
    detailTargetId = null;
    detailEmoji = currentEmoji || '💡';
    detailSelectedType = currentFilter.tab !== 'all' ? tags.find(t => t.id === currentFilter.tab)?.name || '效率' : '效率';
    const modal = document.getElementById('fullscreenEditorModal');
    document.getElementById('fullscreenEmojiBtn').textContent = detailEmoji;
    document.getElementById('fullscreenTitle').value = '';
    document.getElementById('fullscreenEditor').innerHTML = '';
    _editorDirty = false;
    modal.classList.remove('hidden');
}

// ===== Markdown 工具栏 =====
// ===== 所见即所得编辑器命令 =====
function wysiwygCmd(type) {
    const editor = document.getElementById('fullscreenEditor');
    if (!editor) return;
    // 保存当前选区（editor.focus() 可能导致光标跳转）
    const sel = window.getSelection();
    let savedRange = null;
    if (sel.rangeCount > 0) {
        savedRange = sel.getRangeAt(0).cloneRange();
    }
    editor.focus();
    // 恢复选区
    if (savedRange) {
        sel.removeAllRanges();
        sel.addRange(savedRange);
    }
    // 检查选区是否在编辑器内，如果不在则不执行（防止误操作）
    if (!sel.rangeCount) return;
    let checkNode = sel.anchorNode;
    if (checkNode && checkNode.nodeType === 3) checkNode = checkNode.parentNode;
    if (checkNode && !editor.contains(checkNode)) return;

    if (type === 'bold') {
        document.execCommand('bold', false, null);
    } else if (type === 'italic') {
        document.execCommand('italic', false, null);
    } else if (type === 'undo') {
        document.execCommand('undo', false, null);
    } else if (type === 'h1' || type === 'h2' || type === 'h3' || type === 'h4' || type === 'h5') {
        const level = type.charAt(1);
        const currentBlock = document.queryCommandValue('formatBlock').replace(/[<>]/g, '').toLowerCase();
        // 找到光标所在的实际块级元素（用于 DOM 操作替换）
        let node = sel.anchorNode;
        if (node && node.nodeType === 3) node = node.parentNode;
        const blockEl = node ? node.closest('h1,h2,h3,h4,h5,h6,blockquote,p') : null;
        // 如果当前已经是同级别标题，恢复为正文（用 DOM 替换，不能用 formatBlock）
        if (currentBlock === 'h' + level) {
            if (blockEl) {
                const p = document.createElement('p');
                while (blockEl.firstChild) p.appendChild(blockEl.firstChild);
                blockEl.parentNode.replaceChild(p, blockEl);
                const newRange = document.createRange();
                newRange.selectNodeContents(p);
                newRange.collapse(false);
                sel.removeAllRanges();
                sel.addRange(newRange);
            }
            // 取消加粗和斜体（只在已激活时才取消）
            if (document.queryCommandState('bold')) document.execCommand('bold', false, null);
            if (document.queryCommandState('italic')) document.execCommand('italic', false, null);
        } else {
            // 防止标题嵌套：如果当前在标题或引用内，先通过 DOM 操作将外层元素转为 p
            if (currentBlock.startsWith('h') || currentBlock === 'blockquote') {
                if (blockEl) {
                    const p = document.createElement('p');
                    while (blockEl.firstChild) p.appendChild(blockEl.firstChild);
                    blockEl.parentNode.replaceChild(p, blockEl);
                    const newRange = document.createRange();
                    newRange.selectNodeContents(p);
                    newRange.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(newRange);
                }
            }
            document.execCommand('formatBlock', false, 'h' + level);
            if (!sel.toString()) {
                const h = editor.querySelector('h' + level);
                if (h && h.textContent === '') h.textContent = '标题';
            }
        }
    } else if (type === 'insertUnorderedList') {
        document.execCommand('insertUnorderedList', false, null);
    } else if (type === 'insertOrderedList') {
        document.execCommand('insertOrderedList', false, null);
    } else if (type === 'task') {
        // 检测光标/选区是否在待办中，如果是则取消待办
        const range = sel.getRangeAt(0);
        let node = range.startContainer;
        if (node && node.nodeType === 3) node = node.parentNode;
        // 检测是否在 li 中的待办（需要检查多种情况）
        let inTaskLi = node ? node.closest('li') : null;
        if (!inTaskLi) {
            // 检查 commonAncestorContainer
            let common = range.commonAncestorContainer;
            if (common.nodeType === 3) common = common.parentNode;
            inTaskLi = common ? common.closest('li') : null;
        }
        if (!inTaskLi && (node && (node.tagName === 'OL' || node.tagName === 'UL'))) {
            // 选中了整个 li，检查子元素
            const selectedLi = range.startContainer.childNodes[range.startOffset];
            if (selectedLi && selectedLi.tagName === 'LI' && selectedLi.querySelector('input[type="checkbox"]')) {
                inTaskLi = selectedLi;
            }
        }
        if (inTaskLi && inTaskLi.querySelector('input[type="checkbox"]')) {
            // 取消 li 中的待办：恢复为普通列表项
            const span = inTaskLi.querySelector('span');
            const text = span ? span.textContent : '';
            // 收集嵌套列表
            let nestedHtml = '';
            for (const child of inTaskLi.childNodes) {
                if (child.nodeType === 1 && (child.tagName === 'OL' || child.tagName === 'UL')) {
                    nestedHtml += child.outerHTML;
                }
            }
            // 直接修改 li（不用 insertHTML，避免嵌套 ol 导致结构错乱）
            inTaskLi.removeAttribute('style');
            inTaskLi.innerHTML = (text || '<br>') + nestedHtml;
            // 光标移到 li 中
            const newRange = document.createRange();
            newRange.setStart(inTaskLi.firstChild || inTaskLi, 0);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
            setTimeout(updateToolbarHighlight, 10);
            return;
        }
        // 检测是否在 div 中的待办
        const inTaskDiv = node ? node.closest('div[data-task]') : null;
        if (inTaskDiv && inTaskDiv.querySelector('input[type="checkbox"]')) {
            // 取消 div 中的待办：转换为普通段落
            const span = inTaskDiv.querySelector('span');
            const text = span ? span.textContent : '';
            const p = document.createElement('p');
            p.textContent = text || '\u200B';
            inTaskDiv.parentNode.insertBefore(p, inTaskDiv);
            inTaskDiv.remove();
            const newRange = document.createRange();
            newRange.setStart(p.firstChild || p, 0);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
            setTimeout(updateToolbarHighlight, 10);
            return;
        }
        // 如果有选中文本，把选中文本变为待办；否则把当前行变为待办
        let text = sel.toString();
        // 检测光标/选区是否在有序/无序列表的某个 li 中
        let inLi = null;
        if (sel.rangeCount > 0) {
            const r = sel.getRangeAt(0);
            let startNode = r.startContainer;
            if (startNode.nodeType === 3) startNode = startNode.parentNode;
            inLi = startNode.closest ? startNode.closest('li') : null;
            // 如果 startNode 不在 li 中，检查 commonAncestorContainer
            if (!inLi) {
                let common = r.commonAncestorContainer;
                if (common.nodeType === 3) common = common.parentNode;
                inLi = common.closest ? common.closest('li') : null;
            }
            // 如果选中了整个 li（startNode 是 ol/ul），检查 startNode 的子元素
            if (!inLi && (startNode.tagName === 'OL' || startNode.tagName === 'UL')) {
                // 检查选中的是否是单个 li
                const selectedLi = r.startContainer.childNodes[r.startOffset];
                if (selectedLi && selectedLi.tagName === 'LI' && selectedLi === r.endContainer.childNodes[r.endOffset - 1]) {
                    inLi = selectedLi;
                }
            }
        }
        if (inLi) {
            // 只转换当前 li 的文本部分为待办（保留嵌套列表）
            const listEl = inLi.closest('ol, ul');
            if (listEl) {
                // 提取 li 的直接文本（不包括嵌套 ol/ul）
                let liText = '';
                let nestedHtml = '';
                for (const child of inLi.childNodes) {
                    if (child.nodeType === 3) {
                        liText += child.textContent;
                    } else if (child.nodeType === 1 && child.tagName !== 'OL' && child.tagName !== 'UL') {
                        liText += child.textContent;
                    } else if (child.nodeType === 1 && (child.tagName === 'OL' || child.tagName === 'UL')) {
                        nestedHtml += child.outerHTML;
                    }
                }
                liText = liText.trim() || '待办事项';
                const escapedText = liText.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                // 使用 execCommand insertHTML 替换整个 li（支持 undo）
                const taskHtml = `<li style="list-style-type:none;margin-left:-20px"><div data-task="true" style="display:flex;align-items:center;gap:4px" contenteditable="false"><input type="checkbox" onclick="handleTaskCheck(this)" style="margin:0;flex-shrink:0"><span style="flex:1;min-width:0" contenteditable="true">${escapedText}</span></div>${nestedHtml}</li>`;
                // 记录 inLi 在父元素中的位置，用于 insertHTML 后定位新 li
                const liParent = inLi.parentNode;
                const liIndex = Array.from(liParent.childNodes).indexOf(inLi);
                const sel2 = window.getSelection();
                const range2 = document.createRange();
                range2.selectNode(inLi);
                sel2.removeAllRanges();
                sel2.addRange(range2);
                document.execCommand('insertHTML', false, taskHtml);
                // 光标移到刚创建的待办 span 中
                setTimeout(() => {
                    const newLi = liParent.childNodes[liIndex];
                    const taskSpan = newLi ? newLi.querySelector('span') : null;
                    if (taskSpan && taskSpan.firstChild) {
                        const newRange = document.createRange();
                        newRange.selectNodeContents(taskSpan);
                        const s = window.getSelection();
                        s.removeAllRanges();
                        s.addRange(newRange);
                    }
                    updateToolbarHighlight();
                }, 10);
                return;
            }
        }
        if (!text) {
            let node2 = range.startContainer;
            if (node2.nodeType === 3) node2 = node2.parentNode;
            let block = node2.closest('p, div, h1, h2, h3, h4, h5, h6, blockquote') || node2;
            text = block.textContent || '';
            const blockRange = document.createRange();
            blockRange.selectNodeContents(block);
            sel.removeAllRanges();
            sel.addRange(blockRange);
            text = blockRange.toString() || '待办事项';
        }
        // 非列表中的待办：使用 div
        const html = `<div data-task="true" style="display:flex;align-items:center;gap:4px;margin:4px 0;margin-left:4px" contenteditable="false"><input type="checkbox" onclick="handleTaskCheck(this)" style="margin:0;flex-shrink:0"><span style="flex:1;min-width:0" contenteditable="true">${text}</span></div>`;
        if (sel.toString() || sel.rangeCount) {
            const temp = document.createElement('div');
            temp.innerHTML = html;
            const taskEl = temp.firstChild;
            const range3 = sel.getRangeAt(0);
            range3.deleteContents();
            range3.insertNode(taskEl);
            const taskSpan = taskEl.querySelector('span');
            if (taskSpan) {
                const newRange = document.createRange();
                newRange.selectNodeContents(taskSpan);
                sel.removeAllRanges();
                sel.addRange(newRange);
            }
        } else {
            document.execCommand('insertHTML', false, html);
        }
    } else if (type === 'quote') {
        // 检测是否已在 blockquote 中，如果是则取消
        const range = sel.getRangeAt(0);
        let node = range.startContainer;
        if (node && node.nodeType === 3) node = node.parentNode;
        const inBlockquote = node ? node.closest('blockquote') : null;
        if (inBlockquote) {
            // 取消引用：将 blockquote 的子元素移到 blockquote 的位置
            const parent = inBlockquote.parentNode;
            const children = Array.from(inBlockquote.childNodes);
            children.forEach(child => parent.insertBefore(child, inBlockquote));
            inBlockquote.remove();
            // 恢复光标
            if (node && editor.contains(node)) {
                const newRange = document.createRange();
                newRange.setStart(node, 0);
                newRange.collapse(true);
                sel.removeAllRanges();
                sel.addRange(newRange);
            }
        } else {
            // 创建引用：找到光标所在的块级容器（ol/ul/p/h1 等），用 blockquote 包裹
            const block = node ? node.closest('ol, ul, p, h1, h2, h3, h4, h5, h6, div, li') : null;
            if (block) {
                // 如果在列表中，包裹其父 ol/ul
                const listContainer = block.closest('ol, ul');
                if (listContainer) {
                    // 保存光标位置信息
                    const anchorOffset = sel.anchorOffset;
                    let anchorNode = sel.anchorNode;
                    if (anchorNode.nodeType === 3) anchorNode = anchorNode.parentNode;
                    const bq = document.createElement('blockquote');
                    listContainer.parentNode.insertBefore(bq, listContainer);
                    bq.appendChild(listContainer);
                    // 恢复光标
                    if (editor.contains(anchorNode)) {
                        const newRange = document.createRange();
                        try {
                            newRange.setStart(anchorNode, Math.min(anchorOffset, anchorNode.childNodes.length || anchorNode.textContent.length || 0));
                        } catch(e) {
                            newRange.selectNodeContents(anchorNode);
                            newRange.collapse(true);
                        }
                        newRange.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(newRange);
                    }
                } else {
                    // 非 li：用 formatBlock
                    document.execCommand('formatBlock', false, 'blockquote');
                }
            } else {
                document.execCommand('formatBlock', false, 'blockquote');
            }
        }
    } else if (type === 'indent') {
        // 检测是否在待办中，如果是则只缩进当前任务项
        const range = sel.getRangeAt(0);
        let node = range.startContainer;
        if (node && node.nodeType === 3) node = node.parentNode;
        const taskLi = node ? node.closest('li') : null;
        if (taskLi && taskLi.querySelector('input[type="checkbox"]')) {
            const currentMargin = parseInt(taskLi.style.marginLeft) || -20;
            taskLi.style.marginLeft = Math.min(currentMargin + 20, 0) + 'px';
        } else {
            const taskDiv = node ? node.closest('div[data-task]') : null;
            if (taskDiv && taskDiv.querySelector('input[type="checkbox"]')) {
                const currentMargin = parseInt(taskDiv.style.marginLeft) || 4;
                taskDiv.style.marginLeft = (currentMargin + 20) + 'px';
            } else {
                document.execCommand('indent', false, null);
                setTimeout(() => {
                    const sel = window.getSelection();
                    if (sel.rangeCount > 0) {
                        let node = sel.anchorNode;
                        if (node && node.nodeType === 3) node = node.parentNode;
                        const li = node ? node.closest('li') : null;
                        if (li) applyNestStyleOnIndent(li);
                    }
                }, 50);
            }
        }
    } else if (type === 'outdent') {
        // 检测是否在待办中
        const range2 = sel.getRangeAt(0);
        let node2 = range2.startContainer;
        if (node2 && node2.nodeType === 3) node2 = node2.parentNode;
        const taskLi2 = node2 ? node2.closest('li') : null;
        if (taskLi2 && taskLi2.querySelector('input[type="checkbox"]')) {
            const currentMargin = parseInt(taskLi2.style.marginLeft) || -20;
            taskLi2.style.marginLeft = Math.max(currentMargin - 20, -20) + 'px';
        } else {
            const taskDiv2 = node2 ? node2.closest('div[data-task]') : null;
            if (taskDiv2 && taskDiv2.querySelector('input[type="checkbox"]')) {
                const currentMargin = parseInt(taskDiv2.style.marginLeft) || 4;
                taskDiv2.style.marginLeft = Math.max(currentMargin - 20, 4) + 'px';
            } else {
                document.execCommand('outdent', false, null);
            }
        }
    } else if (type === 'image') {
        document.getElementById('imageUpload').click();
    }
    // 更新工具栏高亮
    setTimeout(updateToolbarHighlight, 10);
}

// ===== 列表弹出菜单 =====
// 有序列表类型配置
const OL_TYPES = [
    { id: 'decimal', label: '数字 (1, 2, 3)', icon: '1.', css: 'decimal', sample: '1.' },
    { id: 'decimal-leading-zero', label: '前导零 (01, 02, 03)', icon: '01', css: 'decimal-leading-zero', sample: '01.' },
    { id: 'lower-alpha', label: '小写字母 (a, b, c)', icon: 'a.', css: 'lower-alpha', sample: 'a.' },
    { id: 'upper-alpha', label: '大写字母 (A, B, C)', icon: 'A.', css: 'upper-alpha', sample: 'A.' },
    { id: 'lower-roman', label: '小写罗马 (i, ii, iii)', icon: 'i.', css: 'lower-roman', sample: 'i.' },
    { id: 'upper-roman', label: '大写罗马 (I, II, III)', icon: 'I.', css: 'upper-roman', sample: 'I.' },
    { id: 'cjk-ideographic', label: '中文 (一, 二, 三)', icon: '一', css: 'cjk-ideographic', sample: '一.' },
    { id: 'lower-greek', label: '希腊字母 (α, β, γ)', icon: 'α.', css: 'lower-greek', sample: 'α.' },
];

// 有序列表缩进模式
const OL_NEST_MODES = [
    { id: 'flat', label: '统一编号', desc: '所有层级使用相同编号', levels: ['decimal','decimal','decimal'] },
    { id: 'hierarchical', label: '层级递进', desc: '1 → a → i', levels: ['decimal','lower-alpha','lower-roman'] },
    { id: 'decimal-dot', label: '多级编号', desc: '1 → 1.1 → 1.1.1', levels: ['decimal','decimal','decimal'], dotNotation: true },
];

// 无序列表缩进层级样式
const UL_NEST_LEVELS = ['disc', 'circle', 'square'];

let listPopupState = { type: null, currentOlType: 'decimal', currentStart: 1, currentUlType: 'disc', olNestMode: 'flat' };

function openListPopup(type, btnEl) {
    const editor = document.getElementById('fullscreenEditor');
    if (!editor) return;
    editor.focus();

    listPopupState.type = type;
    const popup = document.getElementById('listPopup');
    const overlay = document.getElementById('listPopupOverlay');
    const orderedPanel = document.getElementById('listPopupOrdered');
    const unorderedPanel = document.getElementById('listPopupUnordered');

    // 检测当前光标是否在列表中
    const sel = window.getSelection();
    let inOl = false, inUl = false, currentStart = 1, currentOlCss = 'decimal', currentUlCss = 'disc';
    listPopupState._targetOl = null;
    listPopupState._targetUl = null;
    if (sel.rangeCount > 0) {
        let node = sel.anchorNode;
        if (node && node.nodeType === 3) node = node.parentNode;
        const li = node ? node.closest('li') : null;
        if (li) {
            const ol = li.closest('ol');
            const ul = li.closest('ul');
            if (ol) {
                inOl = true;
                listPopupState._targetOl = ol;
                currentOlCss = ol.style.listStyleType || 'decimal';
                currentStart = parseInt(ol.getAttribute('start')) || 1;
            }
            if (ul) {
                inUl = true;
                listPopupState._targetUl = ul;
                currentUlCss = ul.style.listStyleType || 'disc';
            }
        }
    }

    if (type === 'ol') {
        orderedPanel.classList.remove('hidden');
        unorderedPanel.classList.add('hidden');
        // 构建有序列表类型子菜单
        buildOlTypeSubmenu(currentOlCss);
        // 更新编号控制状态
        updateOlControls(currentStart);
        // 构建缩进模式选项
        buildOlNestModeOptions();
    } else {
        orderedPanel.classList.add('hidden');
        unorderedPanel.classList.remove('hidden');
        // 高亮当前无序列表样式
        updateUlControls(currentUlCss);
    }

    // 定位弹窗
    const rect = btnEl.getBoundingClientRect();
    popup.style.bottom = (window.innerHeight - rect.top + 6) + 'px';
    popup.style.left = Math.max(8, Math.min(rect.left, window.innerWidth - 200)) + 'px';

    overlay.classList.remove('hidden');
    requestAnimationFrame(() => popup.classList.add('show'));
}

function closeListPopup() {
    const popup = document.getElementById('listPopup');
    const overlay = document.getElementById('listPopupOverlay');
    const picker = document.getElementById('listNumberPicker');
    popup.classList.remove('show');
    overlay.classList.add('hidden');
    picker.classList.add('hidden');
}

function buildOlTypeSubmenu(activeType) {
    const submenu = document.getElementById('listTypeSubmenu');
    const labelEl = document.getElementById('listTypeLabel');
    const iconEl = document.querySelector('#listTypeItem .item-icon');
    const active = OL_TYPES.find(t => t.css === activeType) || OL_TYPES[0];
    listPopupState.currentOlType = activeType;
    labelEl.textContent = active.label;
    iconEl.textContent = active.sample;

    submenu.innerHTML = OL_TYPES.map(t => {
        const cls = t.css === activeType ? ' active' : '';
        return `<div class="list-popup-item${cls}" onclick="selectOlType('${t.css}', '${t.label}', '${t.sample}')">
            <span class="item-icon">${t.sample}</span>
            <span class="item-label">${t.label}</span>
        </div>`;
    }).join('');
}

function selectOlType(css, label, sample) {
    listPopupState.currentOlType = css;
    document.getElementById('listTypeLabel').textContent = label;
    document.querySelector('#listTypeItem .item-icon').textContent = sample;
    // 更新子菜单高亮
    document.querySelectorAll('#listTypeSubmenu .list-popup-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');
    // 隐藏子菜单
    document.getElementById('listTypeSubmenu').classList.remove('show');
    // 应用到编辑器（使用保存的引用）
    if (listPopupState._targetOl) {
        listPopupState._targetOl.style.listStyleType = css;
    }
}

// 构建有序列表缩进模式选项
function buildOlNestModeOptions() {
    const container = document.getElementById('olNestModeOptions');
    if (!container) return;
    container.innerHTML = OL_NEST_MODES.map(m => {
        const cls = m.id === listPopupState.olNestMode ? ' active' : '';
        return `<div class="list-popup-item${cls}" onclick="selectOlNestMode('${m.id}')" style="padding:8px 14px">
            <span class="item-icon" style="font-size:13px">${m.desc}</span>
            <span class="item-label" style="font-size:13px">${m.label}</span>
        </div>`;
    }).join('');
}

function selectOlNestMode(modeId) {
    listPopupState.olNestMode = modeId;
    document.querySelectorAll('#olNestModeOptions .list-popup-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');
    // 应用到编辑器中所有嵌套列表
    applyOlNestModeToEditor(modeId);
}

// 将缩进模式应用到编辑器中所有嵌套 OL
function applyOlNestModeToEditor(modeId) {
    const editor = document.getElementById('fullscreenEditor');
    if (!editor) return;
    const mode = OL_NEST_MODES.find(m => m.id === modeId);
    if (!mode) return;
    // 遍历所有 ol，根据嵌套深度设置样式
    editor.querySelectorAll('ol').forEach(ol => {
        const depth = getListDepth(ol, 'ol');
        const levelStyle = mode.levels[Math.min(depth, mode.levels.length - 1)];
        ol.style.listStyleType = levelStyle;
        if (mode.dotNotation && depth > 0) {
            ol.setAttribute('data-dot-notation', 'true');
        } else {
            ol.removeAttribute('data-dot-notation');
        }
    });
}

// 获取列表元素的嵌套深度
function getListDepth(el, tag) {
    let depth = 0;
    let parent = el.parentElement;
    while (parent) {
        if (parent.tagName === tag.toUpperCase()) depth++;
        parent = parent.parentElement;
    }
    return depth;
}

// Tab 缩进时自动切换列表样式
function applyNestStyleOnIndent(li) {
    if (!li) return;
    const parentList = li.parentElement;
    if (!parentList) return;
    const depth = getListDepth(parentList, parentList.tagName.toLowerCase());
    if (parentList.tagName === 'OL') {
        const mode = OL_NEST_MODES.find(m => m.id === listPopupState.olNestMode) || OL_NEST_MODES[0];
        const levelStyle = mode.levels[Math.min(depth, mode.levels.length - 1)];
        parentList.style.listStyleType = levelStyle;
        if (mode.dotNotation && depth > 0) {
            parentList.setAttribute('data-dot-notation', 'true');
        }
    } else if (parentList.tagName === 'UL') {
        // 无序列表自动按层级切换
        const levelStyle = UL_NEST_LEVELS[Math.min(depth, UL_NEST_LEVELS.length - 1)];
        parentList.style.listStyleType = levelStyle;
    }
    // 递归处理子列表
    li.querySelectorAll('ol, ul').forEach(childList => {
        const childDepth = getListDepth(childList, childList.tagName.toLowerCase());
        if (childList.tagName === 'OL') {
            const mode = OL_NEST_MODES.find(m => m.id === listPopupState.olNestMode) || OL_NEST_MODES[0];
            const cs = mode.levels[Math.min(childDepth, mode.levels.length - 1)];
            childList.style.listStyleType = cs;
        } else {
            const cs = UL_NEST_LEVELS[Math.min(childDepth, UL_NEST_LEVELS.length - 1)];
            childList.style.listStyleType = cs;
        }
    });
}

// ===== 折叠/展开功能 =====
const FOLD_TOGGLE_HTML = '<span class="fold-toggle" contenteditable="false" onclick="event.stopPropagation(); toggleFold(this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>';

function toggleFoldAtCursor() {
    const editor = document.getElementById('fullscreenEditor');
    if (!editor) return;
    const sel = window.getSelection();
    if (!sel.rangeCount) return;
    let node = sel.anchorNode;
    if (node && node.nodeType === 3) node = node.parentNode;
    // 查找最近的标题或列表项
    const heading = node ? node.closest('h1,h2,h3,h4,h5') : null;
    const li = node ? node.closest('li') : null;
    if (heading) {
        toggleFoldForHeading(heading);
    } else if (li) {
        toggleFoldForLi(li);
    }
}

function toggleFoldForHeading(h) {
    const toggle = h.querySelector('.fold-toggle');
    if (toggle) {
        // 已有折叠按钮，切换状态
        toggle.classList.toggle('collapsed');
        // 折叠/展开标题后的所有兄弟元素直到下一个同级或更高级标题
        let sibling = h.nextElementSibling;
        const hLevel = parseInt(h.tagName[1]);
        while (sibling) {
            if (sibling.tagName.match(/^H[1-5]$/)) {
                const sibLevel = parseInt(sibling.tagName[1]);
                if (sibLevel <= hLevel) break;
            }
            sibling.classList.toggle('foldable-collapsed', toggle.classList.contains('collapsed'));
            sibling = sibling.nextElementSibling;
        }
    } else {
        // 添加折叠按钮
        h.insertAdjacentHTML('afterbegin', FOLD_TOGGLE_HTML);
    }
}

function toggleFoldForLi(li) {
    const toggle = li.querySelector('.fold-toggle');
    if (toggle) {
        toggle.classList.toggle('collapsed');
        // 折叠/展开 li 内的子列表
        const subLists = li.querySelectorAll(':scope > ul, :scope > ol');
        subLists.forEach(sl => sl.classList.toggle('foldable-collapsed', toggle.classList.contains('collapsed')));
    } else {
        // 添加折叠按钮，需要把 li 内容包裹
        const childLists = li.querySelectorAll(':scope > ul, :scope > ol');
        if (childLists.length === 0) return; // 没有子列表不需要折叠
        li.classList.add('foldable-parent');
        // 包裹内容
        const wrap = document.createElement('span');
        wrap.className = 'fold-content-wrap';
        while (li.firstChild) {
            wrap.appendChild(li.firstChild);
        }
        li.appendChild(wrap);
        li.insertAdjacentHTML('afterbegin', FOLD_TOGGLE_HTML);
    }
}

function toggleFold(toggleEl) {
    toggleEl.classList.toggle('collapsed');
    const heading = toggleEl.closest('h1,h2,h3,h4,h5');
    if (heading) {
        const hLevel = parseInt(heading.tagName[1]);
        let sibling = heading.nextElementSibling;
        while (sibling) {
            if (sibling.tagName.match(/^H[1-5]$/)) {
                const sibLevel = parseInt(sibling.tagName[1]);
                if (sibLevel <= hLevel) break;
            }
            sibling.classList.toggle('foldable-collapsed', toggleEl.classList.contains('collapsed'));
            sibling = sibling.nextElementSibling;
        }
    } else {
        const li = toggleEl.closest('li');
        if (li) {
            const subLists = li.querySelectorAll(':scope > ul, :scope > ol');
            subLists.forEach(sl => sl.classList.toggle('foldable-collapsed', toggleEl.classList.contains('collapsed')));
        }
    }
}

function toggleOlSubmenu(e) {
    e.stopPropagation();
    const submenu = document.getElementById('listTypeSubmenu');
    const popup = document.getElementById('listPopup');
    const isShowing = submenu.classList.contains('show');
    if (!isShowing) {
        // 检查是否超出右边界，如果是则改为左侧展开
        const popupRect = popup.getBoundingClientRect();
        if (popupRect.right + 170 > window.innerWidth) {
            submenu.style.left = 'auto';
            submenu.style.right = '100%';
            submenu.style.top = '-4px';
        } else {
            submenu.style.left = '100%';
            submenu.style.right = 'auto';
        }
    }
    submenu.classList.toggle('show');
}

function updateOlControls(currentStart) {
    listPopupState.currentStart = currentStart;
    const continueItem = document.getElementById('listContinueItem');
    const newStartItem = document.getElementById('listNewStartItem');
    // 序号为1时，继续和新编号灰色
    if (currentStart <= 1) {
        continueItem.classList.add('disabled');
        newStartItem.classList.add('disabled');
    } else {
        continueItem.classList.remove('disabled');
        newStartItem.classList.remove('disabled');
    }
}

function updateUlControls(activeType) {
    listPopupState.currentUlType = activeType;
    document.querySelectorAll('#listPopupUnordered .list-popup-item').forEach(el => {
        el.classList.toggle('active', el.dataset.ul === activeType);
    });
}

function listAction(action, param) {
    const editor = document.getElementById('fullscreenEditor');
    if (!editor) return;
    editor.focus();
    const sel = window.getSelection();

    if (action === 'ul') {
        // 无序列表：应用样式
        const style = param || 'disc';
        listPopupState.currentUlType = style;
        // 如果当前在待办项中，先转为正文再创建列表（互斥）
        let node = sel.anchorNode;
        if (node && node.nodeType === 3) node = node.parentNode;
        // 也通过编辑器查找光标附近的待办（因为 contenteditable=false 内 sel.anchorNode 可能为 null）
        let taskDiv = node ? node.closest('div[data-task]') : null;
        if (!taskDiv) {
            const allTasks = editor.querySelectorAll('div[data-task]');
            for (const t of allTasks) {
                if (t.querySelector('input[type="checkbox"]') && editor.contains(t)) {
                    taskDiv = t;
                }
            }
        }
        if (taskDiv && taskDiv.querySelector('input[type="checkbox"]')) {
            const span = taskDiv.querySelector('span');
            const text = span ? span.textContent : taskDiv.textContent;
            // 直接用 DOM 创建 <ul><li> 替代待办（execCommand 在移除 contenteditable=false 后不工作）
            const ul = document.createElement('ul');
            ul.style.listStyleType = style;
            const li = document.createElement('li');
            li.textContent = text || '';
            ul.appendChild(li);
            taskDiv.parentNode.insertBefore(ul, taskDiv);
            taskDiv.remove();
            // 光标移到 li 文本末尾
            editor.focus();
            const newRange = document.createRange();
            const textNode = li.firstChild || li;
            newRange.setStart(textNode, textNode.textContent ? textNode.textContent.length : 0);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
            listPopupState._targetUl = ul;
            closeListPopup();
            setTimeout(updateToolbarHighlight, 30);
            return;
        }
        // 如果不在列表中，先创建
        const inList = node ? node.closest('li') : null;
        if (!inList) {
            document.execCommand('insertUnorderedList', false, null);
        } else {
            const ol = node.closest('ol');
            if (ol) {
                document.execCommand('insertUnorderedList', false, null);
            }
        }
        // 应用样式
        setTimeout(() => {
            const editor = document.getElementById('fullscreenEditor');
            const ul = editor.querySelector('ul');
            if (ul) {
                if (style === 'diamond') {
                    ul.style.listStyleType = 'diamond';
                } else {
                    ul.style.listStyleType = style;
                }
                listPopupState._targetUl = ul;
            }
        }, 20);
        closeListPopup();
    } else if (action === 'continue') {
        let node = sel.anchorNode;
        if (node && node.nodeType === 3) node = node.parentNode;
        // 如果当前在待办项中，先转为正文（互斥）
        let taskDiv = node ? node.closest('div[data-task]') : null;
        if (!taskDiv) {
            const allTasks = editor.querySelectorAll('div[data-task]');
            for (const t of allTasks) {
                if (t.querySelector('input[type="checkbox"]') && editor.contains(t)) {
                    taskDiv = t;
                }
            }
        }
        if (taskDiv && taskDiv.querySelector('input[type="checkbox"]')) {
            const span = taskDiv.querySelector('span');
            const text = span ? span.textContent : taskDiv.textContent;
            // 直接用 DOM 创建 <ol><li> 替代待办
            const ol = document.createElement('ol');
            ol.style.listStyleType = listPopupState.currentOlType;
            const li = document.createElement('li');
            li.textContent = text || '';
            ol.appendChild(li);
            taskDiv.parentNode.insertBefore(ol, taskDiv);
            taskDiv.remove();
            editor.focus();
            const newRange = document.createRange();
            const textNode = li.firstChild || li;
            newRange.setStart(textNode, textNode.textContent ? textNode.textContent.length : 0);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
            listPopupState._targetOl = ol;
            closeListPopup();
            setTimeout(updateToolbarHighlight, 30);
            return;
        }
        const inOl = node ? node.closest('ol') : null;
        if (!inOl) {
            document.execCommand('insertOrderedList', false, null);
        }
        setTimeout(() => {
            const editor = document.getElementById('fullscreenEditor');
            const ol = editor.querySelector('ol');
            if (ol) {
                ol.style.listStyleType = listPopupState.currentOlType;
                listPopupState._targetOl = ol;
            }
        }, 20);
        closeListPopup();
    } else if (action === 'newstart') {
        let node = sel.anchorNode;
        if (node && node.nodeType === 3) node = node.parentNode;
        // 如果当前在待办项中，先转为正文（互斥）
        let taskDiv2 = node ? node.closest('div[data-task]') : null;
        if (!taskDiv2) {
            const allTasks2 = editor.querySelectorAll('div[data-task]');
            for (const t of allTasks2) {
                if (t.querySelector('input[type="checkbox"]') && editor.contains(t)) {
                    taskDiv2 = t;
                }
            }
        }
        if (taskDiv2 && taskDiv2.querySelector('input[type="checkbox"]')) {
            const span = taskDiv2.querySelector('span');
            const text = span ? span.textContent : taskDiv2.textContent;
            // 直接用 DOM 创建 <ol><li> 替代待办
            const ol = document.createElement('ol');
            ol.style.listStyleType = listPopupState.currentOlType;
            ol.setAttribute('start', '1');
            const li = document.createElement('li');
            li.textContent = text || '';
            ol.appendChild(li);
            taskDiv2.parentNode.insertBefore(ol, taskDiv2);
            taskDiv2.remove();
            editor.focus();
            const newRange = document.createRange();
            const textNode = li.firstChild || li;
            newRange.setStart(textNode, textNode.textContent ? textNode.textContent.length : 0);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
            listPopupState._targetOl = ol;
            listPopupState.currentStart = 1;
            closeListPopup();
            setTimeout(updateToolbarHighlight, 30);
            return;
        }
        const inOl = node ? node.closest('ol') : null;
        if (!inOl) {
            document.execCommand('insertOrderedList', false, null);
        }
        setTimeout(() => {
            const editor = document.getElementById('fullscreenEditor');
            const ol = editor.querySelector('ol');
            if (ol) {
                ol.setAttribute('start', '1');
                ol.style.listStyleType = listPopupState.currentOlType;
                listPopupState.currentStart = 1;
                listPopupState._targetOl = ol;
            }
        }, 20);
        closeListPopup();
    } else if (action === 'changenumber') {
        // 显示编号值选择器
        const picker = document.getElementById('listNumberPicker');
        const changeItem = document.getElementById('listChangeNumItem');
        if (picker.classList.contains('hidden')) {
            picker.classList.remove('hidden');
            changeItem.classList.add('hidden');
            // 生成1-20的数字按钮
            picker.innerHTML = '';
            for (let i = 1; i <= 20; i++) {
                const btn = document.createElement('div');
                btn.className = 'list-number-btn' + (i === listPopupState.currentStart ? ' active' : '');
                btn.textContent = i;
                btn.onclick = function(e) {
                    e.stopPropagation();
                    applyListStart(i);
                };
                picker.appendChild(btn);
            }
        } else {
            picker.classList.add('hidden');
            changeItem.classList.remove('hidden');
        }
    }
    setTimeout(updateToolbarHighlight, 30);
}

function applyListType(cssType) {
    const editor = document.getElementById('fullscreenEditor');
    if (!editor) return;
    const sel = window.getSelection();
    let node = sel.anchorNode;
    if (node && node.nodeType === 3) node = node.parentNode;
    const ol = node ? node.closest('ol') : null;
    if (ol) {
        ol.style.listStyleType = cssType;
    }
}

function applyListStart(num) {
    if (listPopupState._targetOl) {
        listPopupState._targetOl.setAttribute('start', String(num));
        listPopupState.currentStart = num;
    }
    closeListPopup();
    setTimeout(updateToolbarHighlight, 30);
}

// 处理图片上传（本地文件，自动压缩）
function handleImageUpload(input) {
    const file = input.files[0];
    if (!file) return;
    input.value = '';

    const SIZE_LIMIT = 10 * 1024 * 1024; // 10MB
    if (file.size > SIZE_LIMIT) {
        // 超过10MB，用Canvas压缩
        compressImage(file, 0.8, 2400, function(dataUrl, originalSrc) {
            insertImageToEditor(dataUrl, originalSrc);
        });
    } else {
        // 小于10MB，直接读取
        const reader = new FileReader();
        reader.onload = function(e) {
            insertImageToEditor(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// Canvas压缩图片
function compressImage(file, quality, maxDimension, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const originalSrc = e.target.result;
        const img = new Image();
        img.onload = function() {
            let w = img.width, h = img.height;
            let compressed = false;
            // 如果尺寸超过maxDimension，等比缩小
            if (w > maxDimension || h > maxDimension) {
                if (w > h) { h = Math.round(h * maxDimension / w); w = maxDimension; }
                else { w = Math.round(w * maxDimension / h); h = maxDimension; }
                compressed = true;
            }
            if (compressed) {
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);
                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                callback(dataUrl, originalSrc);
            } else {
                callback(originalSrc, null);
            }
        };
        img.src = originalSrc;
    };
    reader.readAsDataURL(file);
}

// ===== 图片预览 =====
let imagePreviewState = { images: [], currentIdx: 0, rotate: 0, scale: 1, showingOriginal: false, onCloseCallback: null };
let imagePreviewLastClicked = null;
let toolbarHideTimer = null;
let imagePreviewKeyHandler = null;
let imagePreviewWheelHandler = null;
let imagePreviewCachedImages = null;
let imagePreviewFullscreenChangeHandler = null;

// 图片亮度检测阈值（0~255，超过此值判定为浅色背景）
const IMAGE_BRIGHTNESS_THRESHOLD = 170;

// 检测图片亮度 - 直接复用已加载的 DOM img 元素，避免二次下载
function detectImageBrightness(imgEl, cb) {
    if (!imgEl) { cb(0); return; }
    const doDetect = function() {
        try {
            if (!imgEl.naturalWidth || !imgEl.naturalHeight) { cb(0); return; }
            const canvas = document.createElement('canvas');
            canvas.width = 24;
            canvas.height = 24;
            const ctx = canvas.getContext('2d');
            const sw = imgEl.naturalWidth;
            const sh = imgEl.naturalHeight;
            const side = Math.min(sw, sh) * 0.5;
            const sx = (sw - side) / 2;
            const sy = (sh - side) / 2;
            ctx.drawImage(imgEl, sx, sy, side, side, 0, 0, 24, 24);
            const data = ctx.getImageData(0, 0, 24, 24).data;
            let total = 0;
            let count = 0;
            for (let i = 0; i < data.length; i += 12) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
                total += brightness;
                count++;
            }
            cb(total / count);
        } catch (err) {
            cb(0);
        }
    };
    if (imgEl.complete && imgEl.naturalWidth > 0) {
        doDetect();
    } else {
        imgEl.onload = doDetect;
        imgEl.onerror = function() { cb(0); };
    }
}

// 根据图片亮度切换主题 —— 在 modal 上加/去 ip-light-mode 类
function switchPreviewTheme(light) {
    const modal = document.getElementById('imagePreviewModal');
    if (!modal) return;
    if (light) modal.classList.add('ip-light-mode');
    else modal.classList.remove('ip-light-mode');
}

function openImagePreview(src, originalSrc, allImages, allOriginals, startIdx, title, time, body) {
    const compressedImages = allImages && allImages.length > 0 ? allImages : [src];
    const originalImages = allOriginals && allOriginals.length > 0 ? allOriginals : [originalSrc || null];
    while (originalImages.length < compressedImages.length) originalImages.push(null);

    imagePreviewState.images = compressedImages.map((c, i) => ({ compressed: c, original: originalImages[i] || null }));
    imagePreviewState.currentIdx = startIdx || 0;
    imagePreviewState.rotate = 0;
    imagePreviewState.scale = 1;
    imagePreviewState.showingOriginal = false;

    if (window.event && window.event.target) {
        const el = window.event.target;
        if (el && el.tagName === 'IMG') {
            imagePreviewLastClicked = el;
        } else if (el && el.closest) {
            const img = el.closest('img');
            if (img) imagePreviewLastClicked = img;
        }
    }

    imagePreviewCachedImages = new Array(imagePreviewState.images.length);
    for (let i = 0; i < imagePreviewState.images.length; i++) {
        const item = imagePreviewState.images[i];
        const url = item.compressed;
        const imgObj = new Image();
        imgObj.src = url;
        imagePreviewCachedImages[i] = imgObj;
    }

    const modal = document.getElementById('imagePreviewModal');
    if (modal) modal.classList.remove('hidden');

    if (imagePreviewFullscreenChangeHandler) {
        document.removeEventListener('fullscreenchange', imagePreviewFullscreenChangeHandler);
        document.removeEventListener('webkitfullscreenchange', imagePreviewFullscreenChangeHandler);
    }
    imagePreviewFullscreenChangeHandler = function() {
        updateFullscreenIcon();
    };
    document.addEventListener('fullscreenchange', imagePreviewFullscreenChangeHandler);
    document.addEventListener('webkitfullscreenchange', imagePreviewFullscreenChangeHandler);

    renderCurrentPreviewImage();
    setupImagePreviewToolbarAutoHide();
    bindImagePreviewKeyboardAndWheel();
    bindImagePreviewTouchSwipe();
}

function updateFullscreenIcon() {
    const icon = document.getElementById('imagePreviewFullscreenIcon');
    if (!icon) return;
    const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
    if (isFullscreen) {
        icon.innerHTML =
            '<path d="M9 4v4h-4"/>' +
            '<path d="M15 4v4h4"/>' +
            '<path d="M9 20v-4h-4"/>' +
            '<path d="M15 20v-4h4"/>';
    } else {
        icon.innerHTML =
            '<path d="M5 9V5h4"/>' +
            '<path d="M19 9V5h-4"/>' +
            '<path d="M5 15v4h4"/>' +
            '<path d="M19 15v4h-4"/>';
    }
}

function renderCurrentPreviewImage() {
    const img = document.getElementById('imagePreviewImg');
    if (!img) return;
    const item = imagePreviewState.images[imagePreviewState.currentIdx];
    const url = imagePreviewState.showingOriginal ? (item.original || item.compressed) : item.compressed;
    const animateSlide = imagePreviewState.lastDir === 'prev' || imagePreviewState.lastDir === 'next';
    const slideClass = imagePreviewState.lastDir === 'next' ? 'ip-slide-right' : (imagePreviewState.lastDir === 'prev' ? 'ip-slide-left' : null);

    if (animateSlide) {
        img.classList.remove('ip-slide-right', 'ip-slide-left');
        void img.offsetWidth;
        img.classList.add(slideClass);
        setTimeout(() => {
            img.classList.remove('ip-slide-right', 'ip-slide-left');
        }, 300);
        imagePreviewState.lastDir = null;
    }

    const cached = imagePreviewCachedImages && imagePreviewCachedImages[imagePreviewState.currentIdx];
    if (cached && cached.complete && cached.naturalWidth > 0) {
        img.src = cached.src;
        img.style.transform = 'rotate(0deg) scale(1)';
        imagePreviewState.rotate = 0;
        imagePreviewState.scale = 1;
        const overlay = document.getElementById('imagePreviewOverlay');
        if (overlay) overlay.style.backgroundImage = `url("${cached.src}")`;
        detectImageBrightness(img, function(brightness) {
            switchPreviewTheme(brightness > IMAGE_BRIGHTNESS_THRESHOLD);
        });
    } else {
        img.src = url;
        img.style.transform = 'rotate(0deg) scale(1)';
        imagePreviewState.rotate = 0;
        imagePreviewState.scale = 1;
        const overlay = document.getElementById('imagePreviewOverlay');
        if (overlay) overlay.style.backgroundImage = `url("${url}")`;
        img.onload = function() {
            detectImageBrightness(img, function(brightness) {
                switchPreviewTheme(brightness > IMAGE_BRIGHTNESS_THRESHOLD);
            });
        };
    }

    updateFullscreenIcon();

    const pageText = document.getElementById('imagePreviewPageText');
    if (pageText) pageText.textContent = `${imagePreviewState.currentIdx + 1}/${imagePreviewState.images.length}`;

    const zoomLevel = document.getElementById('imagePreviewZoomLevel');
    if (zoomLevel) zoomLevel.textContent = '100%';

    updatePreviewArrowVisibility();
}

function updatePreviewArrowVisibility() {
    const prevBtn = document.getElementById('imagePreviewPrev');
    const nextBtn = document.getElementById('imagePreviewNext');
    if (prevBtn) prevBtn.style.opacity = imagePreviewState.currentIdx === 0 ? '0.3' : '1';
    if (nextBtn) nextBtn.style.opacity = imagePreviewState.currentIdx === imagePreviewState.images.length - 1 ? '0.3' : '1';
}

function prevImageInPreview(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (imagePreviewState.currentIdx > 0) {
        imagePreviewState.currentIdx--;
        imagePreviewState.lastDir = 'prev';
        renderCurrentPreviewImage();
    }
}

function nextImageInPreview(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (imagePreviewState.currentIdx < imagePreviewState.images.length - 1) {
        imagePreviewState.currentIdx++;
        imagePreviewState.lastDir = 'next';
        renderCurrentPreviewImage();
    }
}

function zoomInImageInPreview() {
    const img = document.getElementById('imagePreviewImg');
    if (!img) return;
    imagePreviewState.scale = Math.min(imagePreviewState.scale + 0.25, 4);
    img.style.transform = `rotate(${imagePreviewState.rotate}deg) scale(${imagePreviewState.scale})`;
    const zl = document.getElementById('imagePreviewZoomLevel');
    if (zl) zl.textContent = Math.round(imagePreviewState.scale * 100) + '%';
}

function zoomOutImageInPreview() {
    const img = document.getElementById('imagePreviewImg');
    if (!img) return;
    imagePreviewState.scale = Math.max(imagePreviewState.scale - 0.25, 0.4);
    img.style.transform = `rotate(${imagePreviewState.rotate}deg) scale(${imagePreviewState.scale})`;
    const zl = document.getElementById('imagePreviewZoomLevel');
    if (zl) zl.textContent = Math.round(imagePreviewState.scale * 100) + '%';
}

function toggleFullscreenInPreview() {
    const modal = document.getElementById('imagePreviewModal');
    if (!modal) return;
    if (!document.fullscreenElement) {
        if (modal.requestFullscreen) modal.requestFullscreen().catch(() => {});
        else if (modal.webkitRequestFullscreen) modal.webkitRequestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
}

function rotateImageInPreview() {
    const img = document.getElementById('imagePreviewImg');
    if (!img) return;
    imagePreviewState.rotate = (imagePreviewState.rotate + 90) % 360;
    img.style.transform = `rotate(${imagePreviewState.rotate}deg) scale(${imagePreviewState.scale})`;
}

// 下载图片 - 优先使用文件保存对话框
function downloadImageInPreview() {
    const img = document.getElementById('imagePreviewImg');
    if (!img || !img.src) return;
    const src = img.src;
    const suggestedName = `image_${Date.now()}.png`;

    if (window.showSaveFilePicker) {
        fetch(src).then(r => r.blob()).then(blob => {
            window.showSaveFilePicker({
                suggestedName: suggestedName,
                types: [{ description: 'Image', accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] } }]
            }).then(handle => handle.createWritable().then(w => w.write(blob).then(() => w.close()))).catch(() => {});
        }).catch(() => { fallbackDownload(src, suggestedName); });
        return;
    }

    fallbackDownload(src, suggestedName);
}

function fallbackDownload(src, name) {
    const a = document.createElement('a');
    a.href = src;
    a.download = name || `image_${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 100);
}

function setupImagePreviewToolbarAutoHide() {
    const toolbar = document.getElementById('imagePreviewToolbar');
    const pageLabel = document.getElementById('imagePreviewPageLabel');
    const prevBtn = document.getElementById('imagePreviewPrev');
    const nextBtn = document.getElementById('imagePreviewNext');
    if (!toolbar) return;

    const showAll = () => {
        toolbar.style.opacity = '1';
        if (pageLabel) pageLabel.style.opacity = '1';
        if (prevBtn) prevBtn.style.opacity = imagePreviewState.currentIdx === 0 ? '0.3' : '1';
        if (nextBtn) nextBtn.style.opacity = imagePreviewState.currentIdx === imagePreviewState.images.length - 1 ? '0.3' : '1';
    };
    const hideAll = () => {
        toolbar.style.opacity = '0';
        if (pageLabel) pageLabel.style.opacity = '0';
        if (prevBtn) prevBtn.style.opacity = '0';
        if (nextBtn) nextBtn.style.opacity = '0';
    };

    if (toolbarHideTimer) clearTimeout(toolbarHideTimer);
    showAll();
    toolbarHideTimer = setTimeout(hideAll, 3000);

    const modal = document.getElementById('imagePreviewModal');
    if (modal) {
        modal.onmousemove = () => {
            showAll();
            if (toolbarHideTimer) clearTimeout(toolbarHideTimer);
            toolbarHideTimer = setTimeout(hideAll, 3000);
        };
    }
}

function bindImagePreviewKeyboardAndWheel() {
    if (imagePreviewKeyHandler) document.removeEventListener('keydown', imagePreviewKeyHandler);
    if (imagePreviewWheelHandler) document.removeEventListener('wheel', imagePreviewWheelHandler, { passive: false });

    imagePreviewKeyHandler = function(e) {
        const modal = document.getElementById('imagePreviewModal');
        if (!modal || modal.classList.contains('hidden')) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            // ESC 和 X 按钮走完全同一路径，且让 X 按钮闪烁一次，视觉与点击 X 一致
            const closeBtn = document.getElementById('imagePreviewClose');
            if (closeBtn) {
                closeBtn.style.transform = 'scale(0.9)';
                closeBtn.style.transition = 'transform 0.1s ease';
                setTimeout(() => {
                    closeBtn.style.transform = '';
                }, 100);
            }
            closeImagePreviewAndExit(e);
            return;
        }
        if (e.key === 'ArrowLeft') { e.preventDefault(); prevImageInPreview(e); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); nextImageInPreview(e); }
        else if (e.key === '+' || e.key === '=') { e.preventDefault(); zoomInImageInPreview(); }
        else if (e.key === '-' || e.key === '_') { e.preventDefault(); zoomOutImageInPreview(); }
    };

    // 触控板：横滑切图 + 捏合缩放（累积位移阈值 → 一次滑一张）
    // 使用外层持久变量，避免每次重新绑定都归零
    if (typeof window._previewSwipeState === 'undefined') {
        window._previewSwipeState = { lockUntil: 0, accumX: 0, direction: 0, threshold: 400 };
    }
    const ps = window._previewSwipeState;
    imagePreviewWheelHandler = function(e) {
        const modal = document.getElementById('imagePreviewModal');
        if (!modal || modal.classList.contains('hidden')) return;
        const img = document.getElementById('imagePreviewImg');
        if (!img) return;

        const absX = Math.abs(e.deltaX);
        const absY = Math.abs(e.deltaY);
        const now = Date.now();
        const zl = document.getElementById('imagePreviewZoomLevel');

        // 1) 明确捏合缩放：按住 Ctrl/Meta 键 → 直接缩放（力度大）
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = -e.deltaY * 0.02;
            let newScale = imagePreviewState.scale * (1 + delta);
            newScale = Math.max(0.4, Math.min(4, newScale));
            imagePreviewState.scale = newScale;
            img.style.transform = `rotate(${imagePreviewState.rotate}deg) scale(${imagePreviewState.scale})`;
            if (zl) zl.textContent = Math.round(imagePreviewState.scale * 100) + '%';
            ps.accumX = 0;
            return;
        }

        // 2) 竖向主导（滚轮 / 触控板垂直双指）→ 缩放（力度小）
        if (absY > absX && absY > 10) {
            e.preventDefault();
            const delta = -e.deltaY * 0.008;
            let newScale = imagePreviewState.scale * (1 + delta);
            newScale = Math.max(0.4, Math.min(4, newScale));
            imagePreviewState.scale = newScale;
            img.style.transform = `rotate(${imagePreviewState.rotate}deg) scale(${imagePreviewState.scale})`;
            if (zl) zl.textContent = Math.round(imagePreviewState.scale * 100) + '%';
            ps.accumX = 0;
            return;
        }

        // 3) 横向主导 → 累积位移，每达到阈值切一张（一使劲不会直接跳到最后）
        if (absX > absY && absX > 10) {
            e.preventDefault();
            // 锁期间丢弃所有累积位移，防止锁过期后瞬间再触发
            if (ps.lockUntil > now) {
                ps.accumX = 0;
                return;
            }
            const dir = e.deltaX > 0 ? 1 : -1;
            if (dir !== ps.direction) {
                ps.direction = dir;
                ps.accumX = 0;
            }
            ps.accumX += absX;

            if (ps.accumX >= ps.threshold) {
                ps.lockUntil = now + 500;
                ps.accumX = 0;
                ps.direction = 0;
                if (dir > 0) nextImageInPreview(e);
                else prevImageInPreview(e);
            }
            return;
        }
    };

    document.addEventListener('keydown', imagePreviewKeyHandler);
    document.addEventListener('wheel', imagePreviewWheelHandler, { passive: false });
}

// 图片预览弹窗：触摸滑动切换图片（双指横滑）
let imagePreviewTouchStartX = 0;
let imagePreviewTouchStartY = 0;
let imagePreviewTouchHandler = null;
let imagePreviewSwipeLock = false;

function bindImagePreviewTouchSwipe() {
    const modal = document.getElementById('imagePreviewModal');
    if (!modal) return;
    if (imagePreviewTouchHandler) {
        modal.removeEventListener('touchstart', imagePreviewTouchHandler.start);
        modal.removeEventListener('touchend', imagePreviewTouchHandler.end);
    }
    imagePreviewTouchHandler = {
        start: function(e) {
            imagePreviewTouchStartX = e.changedTouches[0].screenX;
            imagePreviewTouchStartY = e.changedTouches[0].screenY;
        },
        end: function(e) {
            if (imagePreviewSwipeLock) return;
            const diffX = imagePreviewTouchStartX - e.changedTouches[0].screenX;
            const diffY = imagePreviewTouchStartY - e.changedTouches[0].screenY;
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                imagePreviewSwipeLock = true;
                if (diffX > 0) {
                    nextImageInPreview(e);
                } else {
                    prevImageInPreview(e);
                }
                setTimeout(() => { imagePreviewSwipeLock = false; }, 400);
            }
        }
    };
    modal.addEventListener('touchstart', imagePreviewTouchHandler.start, { passive: true });
    modal.addEventListener('touchend', imagePreviewTouchHandler.end, { passive: true });
}

// 处理图片预览中的图片点击
// 当图片放大时点击图片重置缩放并阻止冒泡，否则允许事件冒泡到背景层（点击空白关闭）
function handleImagePreviewClick(e) {
    e.preventDefault();
    // 如果图片被放大了，点击图片重置缩放，并且阻止冒泡（因为图片可能覆盖了大部分区域）
    if (imagePreviewState.scale > 1) {
        imagePreviewState.scale = 1;
        const img = document.getElementById('imagePreviewImg');
        if (img) {
            img.style.transform = `rotate(${imagePreviewState.rotate}deg) scale(1)`;
        }
        const zl = document.getElementById('imagePreviewZoomLevel');
        if (zl) zl.textContent = '100%';
        e.stopPropagation(); // 放大时阻止冒泡，避免点击图片意外关闭
    }
    // 如果图片没有放大（100%），不阻止冒泡，允许点击空白区域关闭预览
}

function closeImagePreview(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    const targetEl = imagePreviewLastClicked;
    doCloseImagePreview(false, targetEl);
}

function closeImagePreviewFromBackground(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    const targetEl = imagePreviewLastClicked;
    doCloseImagePreview(false, targetEl);
}

function closeImagePreviewAndExit(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    // ESC / X 按钮：只关闭图片预览弹窗，不继续关闭详情页
    const targetEl = imagePreviewLastClicked;
    doCloseImagePreview(false, targetEl);
}

function doCloseImagePreview(exitToList, targetEl) {
    const modal = document.getElementById('imagePreviewModal');
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }

    // 先立即隐藏弹窗，避免卡顿感
    if (modal) modal.classList.add('hidden');

    // ★ 关闭回调立即同步调用（不再延迟），确保索引先同步再执行其他操作
    // 从 note 模式进入时，onCloseCallback 会同步图片索引和按钮状态
    const savedCallback = imagePreviewState.onCloseCallback;
    const savedIdx = imagePreviewState.currentIdx;
    imagePreviewState.onCloseCallback = null;
    if (savedCallback) {
        try { savedCallback(savedIdx); } catch (err) {}
    }

    // 延迟执行清理操作
    setTimeout(() => {
        if (toolbarHideTimer) clearTimeout(toolbarHideTimer);

        if (imagePreviewKeyHandler) {
            document.removeEventListener('keydown', imagePreviewKeyHandler);
            imagePreviewKeyHandler = null;
        }
        if (imagePreviewWheelHandler) {
            document.removeEventListener('wheel', imagePreviewWheelHandler);
            imagePreviewWheelHandler = null;
        }
        if (imagePreviewFullscreenChangeHandler) {
            document.removeEventListener('fullscreenchange', imagePreviewFullscreenChangeHandler);
            document.removeEventListener('webkitfullscreenchange', imagePreviewFullscreenChangeHandler);
            imagePreviewFullscreenChangeHandler = null;
        }
        imagePreviewCachedImages = null;
        imagePreviewLastClicked = null;

        // 只有非note模式（即从灵感列表进入）才 scrollIntoView
        // note 模式下 scrollIntoView 会导致意外滚动/跳转
        if (targetEl && typeof targetEl.scrollIntoView === 'function' && !window._notePreviewSync) {
            try {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                highlightImage(targetEl);
            } catch(err) {}
        }

        if (exitToList) {
            setTimeout(function() {
                if (typeof closeCurrentInspirationPage === 'function') {
                    closeCurrentInspirationPage();
                }
            }, 300);
        }
    }, 50);
}

function highlightImage(el) {
    if (!el) return;
    let target = el;
    if (target.tagName !== 'IMG') {
        const img = target.querySelector('img');
        if (img) target = img;
    }

    const originalShadow = target.style.boxShadow;
    const originalScale = target.style.transform;
    const originalFilter = target.style.filter;

    target.style.transition = 'box-shadow 0.4s ease, transform 0.4s ease, filter 0.4s ease';
    target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.6), 0 8px 40px rgba(99, 102, 241, 0.35), 0 0 80px rgba(255, 255, 255, 0.4)';
    target.style.transform = 'scale(1.04)';
    target.style.filter = 'brightness(1.15) saturate(1.2)';

    setTimeout(function() {
        target.style.boxShadow = originalShadow || '';
        target.style.transform = originalScale || '';
        target.style.filter = originalFilter || '';
    }, 1800);
}

function toggleOriginalImageInPreview() {
    imagePreviewState.showingOriginal = !imagePreviewState.showingOriginal;
    renderCurrentPreviewImage();
}

function closeCurrentInspirationPage() {
    const detailModal = document.getElementById('detailModal');
    if (detailModal && !detailModal.classList.contains('hidden')) {
        closeDetailModal();
        return;
    }
    const fsModal = document.getElementById('fullscreenEditorModal');
    if (fsModal && !fsModal.classList.contains('hidden')) {
        _doCloseFullscreenEditor();
        return;
    }
}

// 生成编辑器内图片的包装 HTML（含四角插入区 + 中间预览区）
function wrapEditorImages(html) {
    return html.replace(/<img([^>]*)>/gi, function(match, attrs) {
        const srcMatch = attrs.match(/src="([^"]*)"/i);
        if (!srcMatch) return match;
        const src = srcMatch[1];
        const origMatch = attrs.match(/data-original="([^"]*)"/i);
        const originalSrc = origMatch ? origMatch[1] : '';
        const origAttr = originalSrc ? ' data-original="' + originalSrc + '"' : '';
        return (
            '<div data-editor-img-container contenteditable="false"' + origAttr + ' style="position:relative; display:block; margin:10px 0; line-height:0; outline:2px solid transparent; outline-offset:3px; border-radius:12px; transition:outline-color 0.15s ease, box-shadow 0.2s ease;">' +
                '<img src="' + src + '" data-orig-img="1" style="max-width:100%; border-radius:12px; display:block; transition:box-shadow 0.2s ease; -webkit-user-drag:none; user-select:none; pointer-events:none;" draggable="false" decoding="async">' +
                '<div class="editor-img-center" data-action="preview" style="position:absolute; inset:0; cursor:pointer; border-radius:12px; z-index:1;"></div>' +
                '<div class="editor-img-corner" data-pos="before" style="position:absolute; top:0; left:0; width:44px; height:44px; cursor:text; z-index:2;"></div>' +
                '<div class="editor-img-corner" data-pos="before" style="position:absolute; top:0; right:0; width:44px; height:44px; cursor:text; z-index:2;"></div>' +
                '<div class="editor-img-corner" data-pos="after" style="position:absolute; bottom:0; left:0; width:44px; height:44px; cursor:text; z-index:2;"></div>' +
                '<div class="editor-img-corner" data-pos="after" style="position:absolute; bottom:0; right:0; width:44px; height:44px; cursor:text; z-index:2;"></div>' +
                '<div class="editor-img-delete" data-action="delete" style="position:absolute; top:-10px; right:-10px; width:26px; height:26px; border-radius:9999px; background:#fff; color:#EF4444; display:none; align-items:center; justify-content:center; cursor:pointer; z-index:20; box-shadow:0 2px 10px rgba(0,0,0,0.15); border:1px solid #F3F4F6; font-size:16px; font-weight:700; line-height:1; padding:0;">×</div>' +
            '</div>'
        );
    });
}

// 将光标放置在节点之前（确保可见文本节点存在）
function placeCaretBeforeNode(node) {
    const parent = node.parentNode;
    if (!parent) return;
    // 插入一个零宽空格，确保光标能正确显示位置
    const placeholder = document.createTextNode('\u200B');
    parent.insertBefore(placeholder, node);
    const range = document.createRange();
    range.setStartAfter(placeholder);
    range.collapse(true);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

// 将光标放置在节点之后（确保可见文本节点存在）
function placeCaretAfterNode(node) {
    const parent = node.parentNode;
    if (!parent) return;
    // 插入一个零宽空格，确保光标能正确显示位置
    const placeholder = document.createTextNode('\u200B');
    if (node.nextSibling) {
        parent.insertBefore(placeholder, node.nextSibling);
    } else {
        parent.appendChild(placeholder);
    }
    const range = document.createRange();
    range.setStartBefore(placeholder);
    range.collapse(true);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

// 插入图片到编辑器（使用带四角与中间区的包装形式）
function insertImageToEditor(src, originalSrc) {
    const editor = document.getElementById('fullscreenEditor');
    if (!editor) return;
    editor.focus();
    const origAttr = originalSrc ? ' data-original="' + originalSrc + '"' : '';
    const html = wrapEditorImages('<img src="' + src + '"' + origAttr + '>');
    document.execCommand('insertHTML', false, html);
}

// 初始化所见即所得编辑器
function initMarkdownEditor() {
    const editor = document.getElementById('fullscreenEditor');
    if (!editor) return;

    // 辅助函数：获取上一个/下一个块级元素
    function getPreviousBlock(el, skipChildren, skipList) {
        // 如果是 ol/ul，返回最后一个顶层 li（递归向上时跳过）
        if (!skipList && (el.tagName === 'OL' || el.tagName === 'UL')) {
            const lastLi = el.lastElementChild;
            if (lastLi) return lastLi;
        }
        let prev = el.previousSibling;
        while (prev && (prev.nodeType === 3 && prev.textContent.trim() === '')) prev = prev.previousSibling;
        while (prev && prev.nodeType === 1 && prev.tagName === 'BR') prev = prev.previousSibling;
        if (!prev) {
            if (el.parentNode && el.parentNode !== editor) {
                // 如果父节点是 ol/ul，跳过 ol/ul 找前面的块（递归向上）
                if (el.parentNode.tagName === 'OL' || el.parentNode.tagName === 'UL') {
                    return getPreviousBlock(el.parentNode, true, true);
                }
                return el.parentNode;
            }
            return null;
        }
        // 如果 prev 是 ol/ul，返回最后一个顶层 li
        if (prev.tagName === 'OL' || prev.tagName === 'UL') {
            const lastLi = prev.lastElementChild;
            if (lastLi) return lastLi;
        }
        // 如果 prev 是 li 且有子列表，进入子列表的最后一个元素
        if (prev.tagName === 'LI' && !skipChildren) {
            const subList = prev.querySelector(':scope > ol, :scope > ul');
            if (subList && subList.lastElementChild) {
                // 递归找到子列表最深层的最后一个 li
                let deepest = subList.lastElementChild;
                while (true) {
                    const childList = deepest.querySelector(':scope > ol, :scope > ul');
                    if (childList && childList.lastElementChild) {
                        deepest = childList.lastElementChild;
                    } else break;
                }
                return deepest;
            }
        }
        // 如果 prev 是 li，返回它本身
        return prev;
    }
    function getNextBlock(el, skipChildren, skipList) {
        // 如果是 ol/ul，跳到第一个 li（递归向上时跳过）
        if (!skipList && (el.tagName === 'OL' || el.tagName === 'UL')) {
            const firstLi = el.firstElementChild;
            if (firstLi) return firstLi;
        }
        // 如果是 li，检查是否有子列表（跳到第一个子 li）
        if (el.tagName === 'LI' && !skipChildren) {
            const subList = el.querySelector(':scope > ol, :scope > ul');
            if (subList && subList.firstElementChild) return subList.firstElementChild;
        }
        let next = el.nextSibling;
        while (next && (next.nodeType === 3 && next.textContent.trim() === '')) next = next.nextSibling;
        while (next && next.nodeType === 1 && next.tagName === 'BR') next = next.nextSibling;
        if (!next) {
            if (el.parentNode && el.parentNode !== editor) {
                // 如果父节点是 ol/ul，跳过 ol/ul 找后面的块（递归向上）
                if (el.parentNode.tagName === 'OL' || el.parentNode.tagName === 'UL') {
                    return getNextBlock(el.parentNode, true, true);
                }
                return el.parentNode.nextSibling;
            }
            return null;
        }
        return next;
    }
    // 辅助函数：移动光标到块级元素的末尾（或开头）
    // toStart: true=开头, false=末尾
    // isArrowDown: 按键方向（用于进入ol/ul时决定第一个还是最后一个li）
    function moveCursorToEndOfBlock(block, sel, toStart, isArrowDown) {
        // 如果目标是待办 div，直接进入其 span 找文本节点
        const taskSpan = block.querySelector && block.querySelector('span[contenteditable="true"]');
        if (taskSpan) {
            const textNode = taskSpan.firstChild;
            if (textNode && textNode.nodeType === 3) {
                const range = document.createRange();
                range.setStart(textNode, toStart ? 0 : textNode.textContent.length);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                return;
            }
            // span 为空，光标放到 span 开头/末尾
            const range = document.createRange();
            range.selectNodeContents(taskSpan);
            range.collapse(toStart ? true : false);
            sel.removeAllRanges();
            sel.addRange(range);
            return;
        }
        // 如果目标是 ol/ul，只找直接子 li 的文本（不进入嵌套子列表）
        // 按↓进入列表 → 跳到第一个 li
        // 按↑进入列表 → 跳到最后一个 li
        if (block.tagName === 'OL' || block.tagName === 'UL') {
            const liList = Array.from(block.children).filter(c => c.tagName === 'LI');
            const targetLi = isArrowDown ? liList[0] : liList[liList.length - 1];
            if (targetLi) {
                moveCursorToEndOfBlock(targetLi, sel, toStart, isArrowDown);
                return;
            }
        }
        // 找到块内最后一个（或第一个）可编辑的文本节点（不进入子 ol/ul）
        const textNodes = [];
        const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, {
            acceptNode: function(n) {
                // 跳过 contenteditable=false 的区域
                let p = n.parentElement;
                while (p && p !== block) {
                    if (p.contentEditable === 'false') return NodeFilter.FILTER_REJECT;
                    // 不进入子列表（ol/ul）
                    if (p.tagName === 'OL' || p.tagName === 'UL') return NodeFilter.FILTER_REJECT;
                    p = p.parentElement;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        let tn;
        while (tn = walker.nextNode()) textNodes.push(tn);
        if (textNodes.length === 0) {
            // 没有文本节点，光标放到块内
            const range = document.createRange();
            range.selectNodeContents(block);
            range.collapse(toStart ? true : false);
            sel.removeAllRanges();
            sel.addRange(range);
            return;
        }
        const target = toStart ? textNodes[0] : textNodes[textNodes.length - 1];
        const offset = toStart ? 0 : target.textContent.length;
        const range = document.createRange();
        range.setStart(target, offset);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        // 光标移动后自动滚动：光标位于屏幕中间偏上
        requestAnimationFrame(() => {
            const freshRange = sel.getRangeAt(0);
            const cursorRect = freshRange.getBoundingClientRect();
            const scroller = document.getElementById('fullscreenEditorWrap');
            if (scroller) {
                const scrollerRect = scroller.getBoundingClientRect();
                const scrollerHeight = scrollerRect.height;
                const targetY = scrollerRect.top + scrollerHeight * 0.4;
                const diff = cursorRect.top - targetY;
                if (diff > 0) {
                    const maxScroll = scroller.scrollHeight - scroller.clientHeight;
                    const newScrollTop = Math.min(scroller.scrollTop + diff, maxScroll);
                    if (newScrollTop >= maxScroll && cursorRect.bottom > scrollerRect.bottom - 100) {
                        const spacer = document.createElement('div');
                        spacer.style.height = (scrollerHeight * 0.5) + 'px';
                        spacer.dataset.scrollSpacer = 'true';
                        editor.appendChild(spacer);
                    }
                    scroller.scrollTop = Math.min(scroller.scrollTop + diff, scroller.scrollHeight - scroller.clientHeight);
                }
            }
        });
    }

    // Tab 键缩进 + Backspace 删除 checkbox + 快捷键
    editor.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Z 撤销，Ctrl/Cmd + Shift + Z 重做
        if ((e.ctrlKey || e.metaKey) && !e.altKey) {
            if (e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                document.execCommand('undo', false, null);
                return;
            }
            if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
                e.preventDefault();
                document.execCommand('redo', false, null);
                return;
            }
        }
        // ArrowUp / ArrowDown：自定义导航（文末→文末，文首→文首）
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const sel = window.getSelection();
            if (sel.isCollapsed && sel.rangeCount) {
                let anchorNode = sel.anchorNode;
                let anchorOffset = sel.anchorOffset;
                // 判断光标是否在当前文本节点的末尾/开头
                let atEnd = false, atStart = false;
                if (anchorNode && anchorNode.nodeType === 3) {
                    atEnd = anchorOffset >= anchorNode.textContent.length;
                    atStart = anchorOffset === 0;
                } else if (anchorNode && anchorNode.nodeType === 1) {
                    atEnd = true;
                    atStart = true;
                }
                // 找到光标所在的块级元素
                let block = null;
                if (anchorNode.nodeType === 3) {
                    const taskDiv = anchorNode.parentElement.closest('div[data-task]');
                    if (taskDiv && taskDiv.querySelector('input[type="checkbox"]')) {
                        block = taskDiv;
                    } else {
                        block = anchorNode.parentElement.closest('p,div,h1,h2,h3,h4,h5,h6,li,blockquote,ol,ul');
                        if (!block || block === editor || block.contentEditable === 'false') {
                            block = anchorNode.parentElement;
                        }
                    }
                } else {
                    const taskDiv = anchorNode.closest('div[data-task]');
                    if (taskDiv && taskDiv.querySelector('input[type="checkbox"]')) {
                        block = taskDiv;
                    } else {
                        block = anchorNode.closest('p,div,h1,h2,h3,h4,h5,h6,li,blockquote,ol,ul');
                        if (!block || block === editor) {
                            block = anchorNode;
                        }
                    }
                }
                if (!block) { /* fallback: let browser handle */ }
                else {
                    // 获取块内的文本节点列表（不进入子列表）
                    const blockTextNodes = [];
                    const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, {
                        acceptNode: function(n) {
                            let p = n.parentElement;
                            while (p && p !== block) {
                                if (p.contentEditable === 'false') return NodeFilter.FILTER_REJECT;
                                if (p.tagName === 'OL' || p.tagName === 'UL') return NodeFilter.FILTER_REJECT;
                                p = p.parentElement;
                            }
                            return NodeFilter.FILTER_ACCEPT;
                        }
                    });
                    let tn;
                    while (tn = walker.nextNode()) blockTextNodes.push(tn);
                    // 判断光标是否在块的边界（第一个文本节点的开头 或 最后一个文本节点的末尾）
                    const isAtBlockStart = atStart && blockTextNodes.length > 0 && anchorNode === blockTextNodes[0];
                    const isAtBlockEnd = atEnd && blockTextNodes.length > 0 && anchorNode === blockTextNodes[blockTextNodes.length - 1];
                    // 文末按↓ → 下一块末尾 | 文首按↑ → 上一块开头
                    // 文末按↑ → 上一块末尾 | 文首按↓ → 下一块开头
                    const shouldNavigate = (e.key === 'ArrowDown' && isAtBlockEnd) || (e.key === 'ArrowUp' && isAtBlockStart) ||
                                           (e.key === 'ArrowUp' && isAtBlockEnd) || (e.key === 'ArrowDown' && isAtBlockStart);
                    if (shouldNavigate) {
                        let targetBlock;
                        if (e.key === 'ArrowDown') {
                            targetBlock = getNextBlock(block, false);
                        } else {
                            targetBlock = getPreviousBlock(block);
                        }
                        if (targetBlock) {
                            e.preventDefault();
                            const toStart = atStart;
                            moveCursorToEndOfBlock(targetBlock, sel, toStart, e.key === 'ArrowDown');
                        }
                    }
                }
            }
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            // 检测是否在待办 li 中
            const sel = window.getSelection();
            let tabNode = sel.anchorNode;
            if (tabNode && tabNode.nodeType === 3) tabNode = tabNode.parentNode;
            const taskLi = tabNode ? tabNode.closest('li') : null;
            if (taskLi && taskLi.querySelector('input[type="checkbox"]')) {
                // 待办 li 的缩进：调整 margin-left（增加=向右缩进，减少=向左反缩进）
                const currentMargin = parseInt(taskLi.style.marginLeft) || -20;
                if (e.shiftKey) {
                    // 反缩进（向左）
                    const newMargin = currentMargin - 20;
                    taskLi.style.marginLeft = Math.max(newMargin, -20) + 'px';
                } else {
                    // 缩进（向右）
                    const newMargin = currentMargin + 20;
                    taskLi.style.marginLeft = Math.min(newMargin, 0) + 'px';
                }
                // 保持光标在 span 中
                const span = taskLi.querySelector('span');
                if (span) {
                    const r = document.createRange();
                    r.selectNodeContents(span);
                    sel.removeAllRanges();
                    sel.addRange(r);
                    sel.collapseToEnd();
                }
                return;
            }
            // 检测是否在待办 div 中（非 li）
            const taskDiv = tabNode ? tabNode.closest('div[data-task]') : null;
            if (taskDiv && taskDiv.querySelector('input[type="checkbox"]')) {
                const currentMargin = parseInt(taskDiv.style.marginLeft) || 4;
                if (e.shiftKey) {
                    const newMargin = Math.max(currentMargin - 20, 4);
                    taskDiv.style.marginLeft = newMargin + 'px';
                } else {
                    taskDiv.style.marginLeft = (currentMargin + 20) + 'px';
                }
                // 保持光标在 span 中
                const span = taskDiv.querySelector('span');
                if (span) {
                    const r = document.createRange();
                    r.selectNodeContents(span);
                    sel.removeAllRanges();
                    sel.addRange(r);
                    sel.collapseToEnd();
                }
                return;
            }
            // 非待办中的 Tab：普通缩进/反缩进
            if (e.shiftKey) {
                document.execCommand('outdent', false, null);
            } else {
                document.execCommand('indent', false, null);
            }
            // Tab 缩进/反缩进后，自动应用嵌套样式
            setTimeout(() => {
                const sel = window.getSelection();
                if (sel.rangeCount > 0) {
                    let node = sel.anchorNode;
                    if (node && node.nodeType === 3) node = node.parentNode;
                    const li = node ? node.closest('li') : null;
                    if (li) applyNestStyleOnIndent(li);
                }
            }, 50);
        }
        // Backspace 在 checkbox 后面时，删除整个 checkbox 容器
        // Backspace 在图片后面时，删除图片
        if (e.key === 'Backspace') {
            const sel = window.getSelection();
            if (sel.isCollapsed) {
                const node = sel.anchorNode;
                if (node && node.nodeType === 3) {
                    const parentSpan = node.parentElement;
                    // 检查是否在待办事项的 span 内
                    if (parentSpan && parentSpan.tagName === 'SPAN') {
                        const taskDiv = parentSpan.closest('div[data-task]');
                        if (taskDiv && taskDiv.querySelector('input[type="checkbox"]')) {
                            const parentLi = taskDiv.closest('li');
                            // 在 span 开头按 Backspace
                            if (sel.anchorOffset === 0 && parentSpan.textContent.trim() !== '') {
                                e.preventDefault();
                                if (parentLi) {
                                    // li 中的待办：恢复为普通列表项（保留嵌套列表）
                                    const span = taskDiv.querySelector('span');
                                    const text = span ? span.textContent : '';
                                    let nestedHtml = '';
                                    for (const child of parentLi.childNodes) {
                                        if (child.nodeType === 1 && (child.tagName === 'OL' || child.tagName === 'UL')) {
                                            nestedHtml += child.outerHTML;
                                        }
                                    }
                                    // 直接修改 li（不用 insertHTML，避免嵌套 ol 导致结构错乱）
                                    parentLi.removeAttribute('style');
                                    parentLi.innerHTML = (text || '<br>') + nestedHtml;
                                    // 光标移到恢复的 li 文本末尾
                                    const textNode = parentLi.firstChild;
                                    if (textNode && textNode.nodeType === 3) {
                                        const nr = document.createRange();
                                        nr.setStart(textNode, textNode.textContent.length);
                                        nr.collapse(true);
                                        sel.removeAllRanges();
                                        sel.addRange(nr);
                                    }
                                    updateToolbarHighlight();
                                } else {
                                    // 非 li 中的待办：找上一个兄弟任务合并
                                    const prevSibling = taskDiv.previousElementSibling;
                                    if (prevSibling) {
                                        const prevTaskDiv = prevSibling.tagName === 'DIV' && prevSibling.dataset.task ? prevSibling : prevSibling.querySelector('div[data-task]');
                                        const prevSpan = prevTaskDiv ? prevTaskDiv.querySelector('span') : null;
                                        if (prevSpan) {
                                            const currentText = parentSpan.textContent;
                                            const prevTextLen = prevSpan.textContent.length;
                                            prevSpan.textContent += currentText;
                                            taskDiv.remove();
                                            const newRange = document.createRange();
                                            newRange.setStart(prevSpan.firstChild || prevSpan, prevTextLen);
                                            newRange.collapse(true);
                                            sel.removeAllRanges();
                                            sel.addRange(newRange);
                                        }
                                    } else {
                                        // 没有上一个兄弟：变为普通段落
                                        const p = document.createElement('p');
                                        p.textContent = parentSpan.textContent || '\u200B';
                                        taskDiv.parentNode.insertBefore(p, taskDiv);
                                        taskDiv.remove();
                                        const newRange = document.createRange();
                                        newRange.setStart(p.firstChild || p, 0);
                                        newRange.collapse(true);
                                        sel.removeAllRanges();
                                        sel.addRange(newRange);
                                    }
                                }
                                return;
                            }
                            // 空待办中按 Backspace：变为正文
                            if (parentSpan.textContent.trim() === '') {
                                e.preventDefault();
                                const text = parentSpan.textContent || '';
                                const parentLi = taskDiv.closest('li');
                                if (parentLi) {
                                    parentLi.removeAttribute('style');
                                    parentLi.innerHTML = '<br>';
                                    const newRange = document.createRange();
                                    newRange.setStart(parentLi.firstChild, 0);
                                    newRange.collapse(true);
                                    sel.removeAllRanges();
                                    sel.addRange(newRange);
                                } else {
                                    const p = document.createElement('p');
                                    p.innerHTML = '<br>';
                                    taskDiv.parentNode.insertBefore(p, taskDiv);
                                    taskDiv.remove();
                                    const newRange = document.createRange();
                                    newRange.setStart(p, 0);
                                    newRange.collapse(true);
                                    sel.removeAllRanges();
                                    sel.addRange(newRange);
                                }
                                return;
                            }
                        }
                    }
                    // 检查光标在文本节点最前面，且前一个兄弟是 img
                    if (sel.anchorOffset === 0) {
                        const prevSibling = node.previousSibling;
                        if (prevSibling && prevSibling.tagName === 'IMG') {
                            e.preventDefault();
                            prevSibling.parentNode.removeChild(prevSibling);
                            return;
                        }
                        // 也检查父元素的 previousSibling
                        if (parentSpan && parentSpan.previousSibling && parentSpan.previousSibling.tagName === 'IMG') {
                            e.preventDefault();
                            parentSpan.previousSibling.parentNode.removeChild(parentSpan.previousSibling);
                            return;
                        }
                    }
                }
                // 光标直接在 img 元素上（选中了图片）
                if (node && node.nodeType === 1 && node.tagName === 'IMG') {
                    e.preventDefault();
                    node.parentNode.removeChild(node);
                    return;
                }
                // 光标在待办 span 元素本身（非文本节点，如空 span 只有 <br>）
                if (node && node.nodeType === 1 && node.tagName === 'SPAN') {
                    const taskDiv = node.closest('div[data-task]');
                    if (taskDiv && taskDiv.querySelector('input[type="checkbox"]')) {
                        e.preventDefault();
                        const p = document.createElement('p');
                        p.innerHTML = '<br>';
                        taskDiv.parentNode.insertBefore(p, taskDiv);
                        taskDiv.remove();
                        const newRange = document.createRange();
                        newRange.setStart(p, 0);
                        newRange.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(newRange);
                        return;
                    }
                }
            }
        }
        // Enter 键：在列表项末尾按回车时，如果有子列表，不拆分，而是在整个 li 后面创建新空 li
        if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const sel = window.getSelection();
            if (sel.isCollapsed && sel.rangeCount) {
                let node = sel.anchorNode;
                if (node && node.nodeType === 3) node = node.parentNode;

                // === 待办项中按 Enter：新建空待办或拆分待办 ===
                const taskDiv = node ? node.closest('div[data-task]') : null;
                if (taskDiv && taskDiv.querySelector('input[type="checkbox"]')) {
                    const checkbox = taskDiv.querySelector('input[type="checkbox"]');
                    const span = taskDiv.querySelector('span');
                    // 检测是否在 li 中
                    const parentLi = taskDiv.closest('li');
                    if (span && span.textContent.trim() === '') {
                        // 空待办中按 Enter：退出待办模式
                        e.preventDefault();
                        if (parentLi) {
                            // 在 li 中：恢复为普通列表项
                            parentLi.removeAttribute('style');
                            parentLi.innerHTML = '<br>';
                            const newRange = document.createRange();
                            newRange.setStart(parentLi.firstChild, 0);
                            newRange.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(newRange);
                        } else {
                            // 不在 li 中：变为普通段落
                            const p = document.createElement('p');
                            p.innerHTML = '<br>';
                            taskDiv.parentNode.insertBefore(p, taskDiv);
                            taskDiv.remove();
                            const newRange = document.createRange();
                            newRange.setStart(p, 0);
                            newRange.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(newRange);
                        }
                        return;
                    } else {
                        e.preventDefault();
                        // 检查光标是否在文本中间（可拆分）还是末尾（新建空待办）
                        const textNode = sel.anchorNode;
                        const offset = sel.anchorOffset;
                        let beforeText = '', afterText = '';
                        if (textNode && textNode.nodeType === 3 && span.contains(textNode)) {
                            beforeText = textNode.textContent.substring(0, offset);
                            afterText = textNode.textContent.substring(offset);
                        } else if (textNode === span || (textNode && span.contains(textNode))) {
                            // 光标在 span 元素本身
                            beforeText = span.textContent;
                            afterText = '';
                        } else {
                            beforeText = span.textContent;
                            afterText = '';
                        }
                        beforeText = beforeText || '';
                        afterText = afterText || '';
                        const checkedAttr = checkbox.checked ? ' checked' : '';
                        const textDecoration = checkbox.checked ? 'line-through' : 'none';
                        const opacity = checkbox.checked ? '0.5' : '1';
                        if (afterText.trim()) {
                            // 光标在文本中间：拆分为两个待办（使用 execCommand 支持 undo）
                            // 更新当前待办文本
                            span.textContent = beforeText;
                            // 在当前待办后插入新待办（带后半段文本）
                            const escapedAfter = afterText.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                            if (parentLi) {
                                // 在 li 中：用 execCommand insertHTML 插入新 li
                                const newTaskHtml = `<li style="list-style-type:none;margin-left:${parentLi.style.marginLeft || '-20px'}"><div data-task="true" style="display:flex;align-items:center;gap:4px;text-decoration:${textDecoration};opacity:${opacity}" contenteditable="false"><input type="checkbox"${checkedAttr} onclick="handleTaskCheck(this)" style="margin:0;flex-shrink:0"><span style="flex:1;min-width:0" contenteditable="true">${escapedAfter}</span></div></li>`;
                                // 在当前 li 后面插入
                                const marker = document.createElement('span');
                                marker.id = '_task_split_marker';
                                parentLi.parentNode.insertBefore(marker, parentLi.nextSibling);
                                marker.outerHTML = newTaskHtml;
                                const newTaskLi = parentLi.nextSibling;
                                const newSpan = newTaskLi.querySelector('span');
                                const newRange = document.createRange();
                                newRange.setStart(newSpan.firstChild || newSpan, 0);
                                newRange.collapse(true);
                                sel.removeAllRanges();
                                sel.addRange(newRange);
                            } else {
                                const newTaskHtml = `<div data-task="true" style="display:flex;align-items:center;gap:4px;margin:4px 0;margin-left:4px;text-decoration:${textDecoration};opacity:${opacity}" contenteditable="false"><input type="checkbox"${checkedAttr} onclick="handleTaskCheck(this)" style="margin:0;flex-shrink:0"><span style="flex:1;min-width:0" contenteditable="true">${escapedAfter}</span></div>`;
                                const marker = document.createElement('span');
                                marker.id = '_task_split_marker';
                                taskDiv.parentNode.insertBefore(marker, taskDiv.nextSibling);
                                marker.outerHTML = newTaskHtml;
                                const newTask = taskDiv.nextSibling;
                                const newSpan = newTask.querySelector('span');
                                const newRange = document.createRange();
                                newRange.setStart(newSpan.firstChild || newSpan, 0);
                                newRange.collapse(true);
                                sel.removeAllRanges();
                                sel.addRange(newRange);
                            }
                        } else {
                            // 光标在末尾
                            if (parentLi) {
                                // 在 li 中的待办末尾按 Enter：创建普通列表项（退出待办模式）
                                e.preventDefault();
                                const newLiHtml = '<li><br></li>';
                                const temp = document.createElement('div');
                                temp.innerHTML = newLiHtml;
                                const newLi = temp.firstChild;
                                parentLi.parentNode.insertBefore(newLi, parentLi.nextSibling);
                                const newRange = document.createRange();
                                newRange.setStart(newLi.firstChild, 0);
                                newRange.collapse(true);
                                sel.removeAllRanges();
                                sel.addRange(newRange);
                            } else {
                                // 非 li 中的待办末尾按 Enter：创建普通段落
                                e.preventDefault();
                                const p = document.createElement('p');
                                p.innerHTML = '<br>';
                                taskDiv.parentNode.insertBefore(p, taskDiv.nextSibling);
                                const newRange = document.createRange();
                                newRange.setStart(p, 0);
                                newRange.collapse(true);
                                sel.removeAllRanges();
                                sel.addRange(newRange);
                            }
                        }
                    }
                    return;
                }

                const li = node ? node.closest('li') : null;
                if (li) {
                    // === 5s 内空列表项再按 Enter：退出列表 ===
                    const liText = li.textContent.trim();
                    if (liText === '') {
                        const now = Date.now();
                        if (window._lastEmptyLiEnterTime && (now - window._lastEmptyLiEnterTime) < 5000) {
                            // 5s 内再次在空 li 中按 Enter，退出列表
                            e.preventDefault();
                            window._lastEmptyLiEnterTime = null;
                            // 将空 li 替换为空 p（放在列表容器之后）
                            const listEl = li.closest('ol, ul');
                            const p = document.createElement('p');
                            p.innerHTML = '<br>';
                            if (listEl && listEl.children.length <= 1) {
                                // 列表只剩这一个空 li，移除整个列表
                                listEl.parentNode.insertBefore(p, listEl);
                                listEl.remove();
                            } else {
                                // 列表还有其他项，只移除空 li
                                li.remove();
                                listEl.parentNode.insertBefore(p, listEl.nextSibling);
                            }
                            // 光标移到 p 中
                            const newRange = document.createRange();
                            newRange.setStart(p, 0);
                            newRange.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(newRange);
                            return;
                        }
                        window._lastEmptyLiEnterTime = now;
                    } else {
                        window._lastEmptyLiEnterTime = null;
                    }

                    // 检查当前 li 是否有子列表
                    const subLists = li.querySelectorAll(':scope > ol, :scope > ul');
                    if (subLists.length > 0) {
                        // 检查光标是否在 li 的文本末尾（即子列表之前）
                        const textParts = [];
                        for (const child of li.childNodes) {
                            if (child.nodeType === 3) textParts.push(child);
                            else if (child.nodeType === 1 && child.tagName !== 'OL' && child.tagName !== 'UL') textParts.push(child);
                        }
                        // 找到光标所在的文本部分
                        let cursorAtTextEnd = false;
                        for (const part of textParts) {
                            if (part.contains && part.contains(sel.anchorNode)) {
                                if (sel.anchorNode.nodeType === 3) {
                                    cursorAtTextEnd = sel.anchorOffset >= sel.anchorNode.textContent.length;
                                } else {
                                    cursorAtTextEnd = true;
                                }
                                break;
                            }
                        }
                        if (cursorAtTextEnd) {
                            e.preventDefault();
                            // 在子列表的最前面插入一个新的空列表项
                            const firstSubList = li.querySelector(':scope > ol, :scope > ul');
                            if (firstSubList) {
                                const newLi = document.createElement('li');
                                newLi.innerHTML = '<br>';
                                firstSubList.insertBefore(newLi, firstSubList.firstChild);
                                // 把光标移到新 li 中
                                const newRange = document.createRange();
                                newRange.setStart(newLi, 0);
                                newRange.collapse(true);
                                sel.removeAllRanges();
                                sel.addRange(newRange);
                            }
                            return;
                        }
                    }

                    // === 处理嵌套列表中按 Enter 的情况 ===
                    // 当在子列表的最后一项末尾按回车时，应该在外层列表中创建新项
                    const parentOl = li.closest('ol');
                    if (parentOl) {
                        // 检查当前 li 是否是其父列表的最后一项
                        const isLastInParent = li.nextElementSibling === null;
                        // 检查当前 li 是否是某个嵌套列表的子项
                        const isNested = parentOl.parentElement.tagName === 'LI';
                        
                        if (isLastInParent && isNested) {
                            // 在嵌套列表的最后一项按回车，应该在外层列表中创建新项
                            const outerLi = parentOl.parentElement; // 外层 li
                            const outerOl = outerLi.parentElement; // 外层 ol
                            if (outerOl && outerOl.tagName === 'OL') {
                                e.preventDefault();
                                const newLi = document.createElement('li');
                                newLi.innerHTML = '<br>';
                                outerLi.parentNode.insertBefore(newLi, outerLi.nextSibling);
                                const newRange = document.createRange();
                                newRange.setStart(newLi, 0);
                                newRange.collapse(true);
                                sel.removeAllRanges();
                                sel.addRange(newRange);
                                return;
                            }
                        }
                    }
                }
            }
        }
    });
    // 粘贴图片支持（带压缩）
    editor.addEventListener('paste', function(e) {
        const items = e.clipboardData && e.clipboardData.items;
        if (!items) return;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                e.preventDefault();
                const blob = items[i].getAsFile();
                const SIZE_LIMIT = 10 * 1024 * 1024;
                if (blob.size > SIZE_LIMIT) {
                    compressImage(blob, 0.8, 2400, function(dataUrl, originalSrc) {
                        editor.focus();
                        insertImageToEditor(dataUrl, originalSrc);
                    });
                } else {
                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        editor.focus();
                        insertImageToEditor(evt.target.result);
                    };
                    reader.readAsDataURL(blob);
                }
                return;
            }
        }
    });
    // 监听选区变化，高亮当前格式
    editor.addEventListener('keyup', updateToolbarHighlight);
    editor.addEventListener('mouseup', updateToolbarHighlight);
    editor.addEventListener('click', updateToolbarHighlight);
    // 点击 checkbox 时，将光标移到 span 中并更新工具栏高亮
    editor.addEventListener('click', function(e) {
        if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            const taskDiv = e.target.closest('div[data-task]');
            if (taskDiv) {
                const span = taskDiv.querySelector('span');
                if (span) {
                    const newRange = document.createRange();
                    newRange.setStart(span.firstChild || span, 0);
                    newRange.collapse(true);
                    const s = window.getSelection();
                    s.removeAllRanges();
                    s.addRange(newRange);
                    setTimeout(updateToolbarHighlight, 10);
                }
            }
        }
    });
    // 真实编辑触发修改标记（用户输入、粘贴、工具栏操作等）
    editor.addEventListener('input', function() { _editorDirty = true; });
    const titleField = document.getElementById('fullscreenTitle');
    if (titleField) titleField.addEventListener('input', function() { _editorDirty = true; });

    // 编辑器图片点击处理：四角插入区放置光标，中间预览区切换选中/打开大图预览，删除按钮删除图片
    editor.addEventListener('click', function(e) {
        // 情况1：点击了删除按钮 —— 删除图片
        if (e.target.classList && e.target.classList.contains('editor-img-delete')) {
            e.preventDefault();
            e.stopPropagation();
            const container = e.target.closest('[data-editor-img-container]');
            if (!container) return;
            const parent = container.parentNode;
            if (parent) {
                parent.removeChild(container);
                _editorDirty = true;
            }
            return;
        }
        // 情况2：点击了四角插入区 —— 放置光标
        if (e.target.classList && e.target.classList.contains('editor-img-corner')) {
            e.preventDefault();
            e.stopPropagation();
            // 先清除所有图片的选中状态
            editor.querySelectorAll('[data-editor-img-container].selected').forEach(c => c.classList.remove('selected'));
            const container = e.target.closest('[data-editor-img-container]');
            if (!container) return;
            const pos = e.target.getAttribute('data-pos');
            editor.focus();
            if (pos === 'before') {
                placeCaretBeforeNode(container);
            } else {
                placeCaretAfterNode(container);
            }
            return;
        }
        // 情况3：点击了中间预览区 —— 切换选中状态，然后打开大图预览
        if (e.target.classList && e.target.classList.contains('editor-img-center')) {
            e.preventDefault();
            e.stopPropagation();
            const container = e.target.closest('[data-editor-img-container]');
            if (!container) return;
            const img = container.querySelector('img');
            if (!img) return;
            // 切换选中状态：如果已经选中则取消，否则选中当前并清除其他
            const isSelected = container.classList.contains('selected');
            editor.querySelectorAll('[data-editor-img-container].selected').forEach(c => c.classList.remove('selected'));
            if (!isSelected) {
                container.classList.add('selected');
            }
            const src = img.src;
            const originalSrc = container.getAttribute('data-original');
            const allContainers = Array.from(editor.querySelectorAll('[data-editor-img-container]'));
            const allUrls = allContainers.map(c => c.querySelector('img')?.src || '');
            const allOriginals = allContainers.map(c => c.getAttribute('data-original') || null);
            const currentIdx = allContainers.indexOf(container);
            const editorBody = editor.innerText || '';
            openImagePreview(src, originalSrc, allUrls, allOriginals, currentIdx, '', '', editorBody.substring(0, 300));
            return;
        }
        // 情况4：点击空白区/其他文本区 —— 取消所有图片的选中状态
        const clickedInImg = e.target.closest && e.target.closest('[data-editor-img-container]');
        if (!clickedInImg) {
            editor.querySelectorAll('[data-editor-img-container].selected').forEach(c => c.classList.remove('selected'));
        }
    });

    // 图片键盘删除：选中图片时按 Backspace/Delete 删除
    editor.addEventListener('keydown', function(e) {
        const key = e.key;
        if (key !== 'Backspace' && key !== 'Delete') return;
        const selectedContainer = editor.querySelector('[data-editor-img-container].selected');
        if (!selectedContainer) return;
        e.preventDefault();
        e.stopPropagation();
        const parent = selectedContainer.parentNode;
        if (parent) {
            parent.removeChild(selectedContainer);
            _editorDirty = true;
        }
    });

    // 点击列表项右侧空白区域时，将光标移到文本末尾而非开头
    // 使用 mousedown 而非 click，避免光标先跳左边再跳右边的闪烁
    editor.addEventListener('mousedown', function(e) {
        // 只处理左键
        if (e.button !== 0) return;
        let node = e.target;
        if (!node) return;
        if (node.nodeType === 3) node = node.parentNode;
        // 检查是否点击了 checkbox（不拦截）
        if (node && node.tagName === 'INPUT' && node.type === 'checkbox') return;

        // 找到最近的块级元素
        let block = null;
        const li = node ? node.closest('li') : null;
        if (li) {
            block = li;
        } else {
            // 也处理 p, h1-h6, blockquote, div（待办）等块级元素
            block = node ? node.closest('p,div,h1,h2,h3,h4,h5,h6,blockquote') : null;
            // 如果是待办 div，找到它的 span
            if (block && block.querySelector('input[type="checkbox"]')) {
                // 点击待办区域时，让默认行为处理（点击 span 内部会自动定位）
                return;
            }
        }
        if (!block) return;

        // 找到块内最后一个有内容的文本节点及其右边界
        let lastTextNode = null;
        for (const child of block.childNodes) {
            if (child.nodeType === 3 && child.textContent.trim()) {
                lastTextNode = child;
            } else if (child.nodeType === 1 && child.tagName !== 'OL' && child.tagName !== 'UL') {
                const walker = document.createTreeWalker(child, NodeFilter.SHOW_TEXT, null);
                let textNode;
                while (textNode = walker.nextNode()) {
                    if (textNode.textContent.trim()) lastTextNode = textNode;
                }
            }
        }
        if (!lastTextNode) return;
        // 检查点击位置是否在最后一个文本节点的右边界之后（即空白区域）
        try {
            const textRange = document.createRange();
            textRange.selectNodeContents(lastTextNode);
            const textRect = textRange.getBoundingClientRect();
            if (e.clientX > textRect.right + 4) {
                e.preventDefault();
                // 立即设置光标到文本末尾，避免先跳到序号旁再跳回来的闪烁
                const sel = window.getSelection();
                const range = document.createRange();
                range.setStart(lastTextNode, lastTextNode.textContent.length);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        } catch(err) {}
    });

    // 双击选中当前块的全部文本内容（不跨子元素边界）
    // 用 mousedown 检测双击，在第二次点击时阻止 selectstart 来避免浏览器选词
    let _lastClickTime = 0;
    let _lastClickBlock = null;
    let _blockOnSelectStart = null;
    editor.addEventListener('mousedown', function(e) {
        if (e.button !== 0) return;
        let node = e.target;
        if (!node) return;
        if (node.nodeType === 3) node = node.parentNode;
        // 找到光标所在的最内层块级元素
        let block = null;
        const taskDiv = node.closest('div[data-task]');
        if (taskDiv && taskDiv.querySelector('input[type="checkbox"]')) {
            block = taskDiv;
        } else {
            block = node.closest('p,h1,h2,h3,h4,h5,h6,blockquote');
            if (!block) {
                let el = node;
                while (el && el !== editor) {
                    if (el.tagName === 'LI') { block = el; break; }
                    el = el.parentElement;
                }
            }
        }
        if (!block) return;
        const now = Date.now();
        if (_lastClickBlock === block && (now - _lastClickTime) < 400) {
            // 双击确认：记录要全选的块，在 selectstart 时阻止并全选
            _blockOnSelectStart = block;
        } else {
            _blockOnSelectStart = null;
        }
        _lastClickTime = now;
        _lastClickBlock = block;
    });
    editor.addEventListener('selectstart', function(e) {
        if (_blockOnSelectStart) {
            e.preventDefault();
            const block = _blockOnSelectStart;
            _blockOnSelectStart = null;
            const sel = window.getSelection();
            const range = document.createRange();
            const isHeading = /^H[1-6]$/.test(block.tagName);
            const isLiWithSublist = block.tagName === 'LI' && block.querySelector(':scope > ol, :scope > ul');
            if (isLiWithSublist || isHeading) {
                let startNode = null, endNode = null;
                for (const child of block.childNodes) {
                    if (child.nodeType === 3 && child.textContent.trim()) {
                        if (!startNode) startNode = child;
                        endNode = child;
                    } else if (child.nodeType === 1 && child.tagName !== 'OL' && child.tagName !== 'UL' && !child.classList.contains('fold-toggle')) {
                        if (!startNode) startNode = child;
                        endNode = child;
                    }
                }
                if (startNode && endNode) {
                    range.setStart(startNode, 0);
                    if (endNode.nodeType === 3) range.setEnd(endNode, endNode.textContent.length);
                    else range.setEndAfter(endNode);
                } else {
                    range.selectNodeContents(block);
                }
            } else {
                range.selectNodeContents(block);
            }
            sel.removeAllRanges();
            sel.addRange(range);
        }
    });

    // 输入 "1." 或 "- " 自动转为有序/无序列表
    editor.addEventListener('input', function(e) {
        const sel = window.getSelection();
        if (!sel.isCollapsed || !sel.rangeCount) return;
        let node = sel.anchorNode;
        if (!node) return;
        // 如果光标已在列表上下文（li/ol/ul）内，不触发自动转换（避免干扰正常编辑）
        // 需要同时检查文本节点和元素节点的情况
        let checkNode = node.nodeType === 3 ? node.parentElement : node;
        if (checkNode && (checkNode.closest('li') || checkNode.closest('ol') || checkNode.closest('ul'))) return;
        if (node.nodeType !== 3) return;
        const text = node.textContent;
        const offset = sel.anchorOffset;
        // 检查光标前的文本是否匹配 "数字." 或 "- "
        const before = text.substring(0, offset);
        // 有序列表：匹配 "1." "2." 等（数字+点+空格或行尾）
        const olMatch = before.match(/(\d+)\.\s$/);
        if (olMatch) {
            const num = parseInt(olMatch[1]);
            // 替换 "1. " 为空，然后插入有序列表
            e.preventDefault();
            const range = sel.getRangeAt(0);
            range.setStart(node, offset - olMatch[0].length);
            range.deleteContents();
            document.execCommand('insertOrderedList', false, null);
            // 设置起始编号
            setTimeout(() => {
                const ol = editor.querySelector('ol');
                if (ol && num > 1) ol.setAttribute('start', String(num));
            }, 20);
            return;
        }
        // 无序列表：匹配 "- "
        const ulMatch = before.match(/-\s$/);
        if (ulMatch) {
            e.preventDefault();
            const range = sel.getRangeAt(0);
            range.setStart(node, offset - ulMatch[0].length);
            range.deleteContents();
            document.execCommand('insertUnorderedList', false, null);
            return;
        }
        // 打字时自动滚动：光标位于屏幕中间偏上
        requestAnimationFrame(() => {
            const freshRange = sel.getRangeAt(0);
            const cursorRect = freshRange.getBoundingClientRect();
            const scroller = document.getElementById('fullscreenEditorWrap');
            if (scroller) {
                const scrollerRect = scroller.getBoundingClientRect();
                const scrollerHeight = scrollerRect.height;
                // 目标：光标位于视口高度的 40% 处（中间偏上）
                const targetY = scrollerRect.top + scrollerHeight * 0.4;
                const diff = cursorRect.top - targetY;
                // 只有当光标在目标位置下方时才滚动
                if (diff > 0) {
                    // 如果滚动到底后光标仍在底部，添加底部留白
                    const maxScroll = scroller.scrollHeight - scroller.clientHeight;
                    const newScrollTop = Math.min(scroller.scrollTop + diff, maxScroll);
                    if (newScrollTop >= maxScroll && cursorRect.bottom > scrollerRect.bottom - 100) {
                        // 添加底部留白（半个视口高度）
                        const spacer = document.createElement('div');
                        spacer.style.height = (scrollerHeight * 0.5) + 'px';
                        spacer.dataset.scrollSpacer = 'true';
                        editor.appendChild(spacer);
                    }
                    scroller.scrollTop = Math.min(scroller.scrollTop + diff, scroller.scrollHeight - scroller.clientHeight);
                }
            }
        });
    });

    // 工具栏触摸/鼠标 tooltip 支持
    const tooltipEl = document.getElementById('mdTooltip');
    const tooltipText = document.getElementById('mdTooltipText');
    let tooltipTimer = null;

    function showToolbarTooltip(btn) {
        if (!tooltipEl || !tooltipText) return;
        const text = btn.getAttribute('data-tooltip');
        if (!text) return;
        tooltipText.textContent = text;
        // 计算位置：按钮上方居中
        const btnRect = btn.getBoundingClientRect();
        const toolbarHeight = 56; // 工具栏大致高度
        tooltipEl.style.left = (btnRect.left + btnRect.width / 2) + 'px';
        tooltipEl.style.bottom = (window.innerHeight - btnRect.top + 6) + 'px';
        tooltipEl.style.transform = 'translateX(-50%)';
        tooltipEl.style.opacity = '1';
    }

    function hideToolbarTooltip() {
        if (!tooltipEl) return;
        tooltipEl.style.opacity = '0';
        clearTimeout(tooltipTimer);
    }

    document.querySelectorAll('#fullscreenEditorModal .toolbar-btn').forEach(btn => {
        // 鼠标 hover
        btn.addEventListener('mouseenter', function() {
            clearTimeout(tooltipTimer);
            showToolbarTooltip(btn);
        });
        btn.addEventListener('mouseleave', function() {
            hideToolbarTooltip();
        });
        // 触摸支持
        btn.addEventListener('touchstart', function(e) {
            clearTimeout(tooltipTimer);
            showToolbarTooltip(btn);
            tooltipTimer = setTimeout(hideToolbarTooltip, 1500);
        }, { passive: true });
        btn.addEventListener('touchend', function() {
            tooltipTimer = setTimeout(hideToolbarTooltip, 800);
        });
    });
}

function updateToolbarHighlight() {
    const theme = THEMES[currentTheme] || THEMES.blue;
    const activeColor = theme.primary;
    const activeBg = theme.primaryFaint;
    // 获取光标所在的最内层块级元素标签（穿透 li 检测 h1-h5）
    const sel = window.getSelection();
    let cursorBlock = '';
    let inUl = false, inOl = false, inTask = false;
    if (sel.rangeCount > 0) {
        let node = sel.anchorNode;
        if (node && node.nodeType === 3) node = node.parentNode;
        // 检测是否在待办中（li 或 div 中的 checkbox）
        if (node) {
            const taskLi = node.closest('li');
            if (taskLi && taskLi.querySelector('input[type="checkbox"]')) {
                inTask = true;
            } else {
                const taskDiv = node.closest('div[data-task]');
                if (taskDiv && taskDiv.querySelector('input[type="checkbox"]')) {
                    inTask = true;
                }
            }
        }
        // 检测是否在列表中（排除待办 li）
        if (node && !inTask) {
            const li = node.closest('li');
            if (li) {
                const ul = li.closest('ul');
                const ol = li.closest('ol');
                inUl = !!ul;
                inOl = !!ol;
            }
        }
        // 优先查找最近的 h1-h6/blockquote（穿透 li）
        const heading = node ? node.closest('h1,h2,h3,h4,h5,h6,blockquote') : null;
        if (heading) {
            cursorBlock = heading.tagName.toLowerCase();
        } else {
            // 回退到 formatBlock
            cursorBlock = document.queryCommandValue('formatBlock').replace(/[<>]/g, '').toLowerCase();
        }
    }
    document.querySelectorAll('.toolbar-btn').forEach(btn => {
        const cmd = btn.dataset.cmd;
        let isActive = false;
        if (cmd === 'bold') {
            isActive = document.queryCommandState('bold');
        } else if (cmd === 'italic') {
            isActive = document.queryCommandState('italic');
        } else if (cmd === 'insertUnorderedList') {
            isActive = inTask ? false : inUl;
        } else if (cmd === 'insertOrderedList') {
            isActive = inTask ? false : inOl;
        } else if (cmd === 'h1' || cmd === 'h2' || cmd === 'h3' || cmd === 'h4' || cmd === 'h5') {
            isActive = cursorBlock === cmd;
        } else if (cmd === 'quote') {
            isActive = cursorBlock === 'blockquote';
        } else if (cmd === 'task') {
            isActive = inTask;
        }
        if (isActive) {
            btn.style.color = activeColor;
            btn.style.backgroundColor = activeBg;
        } else {
            btn.style.color = '';
            btn.style.backgroundColor = '';
        }
    });
}

// HTML 转 Markdown（保存时用）
// 将嵌套 HTML 列表一次性转换为带缩进的 Markdown
function convertNestedListsToMd(html, tag) {
    // 找到所有顶层 <tag> 元素
    const outerRegex = new RegExp('<' + tag + '([^>]*)>([\\s\\S]*)</' + tag + '>', 'gi');
    return html.replace(outerRegex, function(match, attrs, inner) {
        return convertListTreeToMd(inner, attrs, tag, 0);
    });
}

// 递归转换列表树
function convertListTreeToMd(html, parentAttrs, parentTag, depth) {
    const indent = '   '.repeat(depth);
    const startMatch = parentAttrs.match(/start=["']?(\d+)/i);
    let idx = startMatch ? parseInt(startMatch[1]) : 1;
    const styleMatch = parentAttrs.match(/style=["'][^"']*list-style-type:\s*([^;"']+)/i);
    const listStyle = styleMatch ? styleMatch[1].trim() : (parentTag === 'ol' ? 'decimal' : 'disc');
    
    const numStr = (n) => {
        if (listStyle === 'lower-alpha') return String.fromCharCode(96 + n);
        if (listStyle === 'upper-alpha') return String.fromCharCode(64 + n);
        if (listStyle === 'lower-roman') {
            const romans = ['','i','ii','iii','iv','v','vi','vii','viii','ix','x',
                'xi','xii','xiii','xiv','xv','xvi','xvii','xviii','xix','xx'];
            return (romans[n] || String(n));
        }
        return String(n);
    };
    
    let result = '';
    let pos = 0;
    while (pos < html.length) {
        // 找到下一个 <li
        const liStart = html.indexOf('<li', pos);
        if (liStart === -1) {
            // 处理剩余的非 li 内容（如占位符）
            if (pos < html.length) {
                const remaining = html.substring(pos).replace(/<[^>]+>/g, '').trim();
                if (remaining) result += indent + remaining + '\n';
            }
            break;
        }
        // 处理 <li 之前的非 li 内容（如占位符）
        if (liStart > pos) {
            const beforeLi = html.substring(pos, liStart).replace(/<[^>]+>/g, '').trim();
            if (beforeLi) result += indent + beforeLi + '\n';
        }
        const liTagEnd = html.indexOf('>', liStart);
        if (liTagEnd === -1) break;
        const contentStart = liTagEnd + 1;
        
        // 用深度计数找到匹配的 </li>
        let liDepth = 1;
        let searchPos = contentStart;
        let liEnd = -1;
        while (searchPos < html.length && liDepth > 0) {
            const nextOpen = html.indexOf('<li', searchPos);
            const nextClose = html.indexOf('</li>', searchPos);
            if (nextClose === -1) break;
            if (nextOpen !== -1 && nextOpen < nextClose) {
                liDepth++;
                searchPos = nextOpen + 3;
            } else {
                liDepth--;
                if (liDepth === 0) liEnd = nextClose;
                searchPos = nextClose + 5;
            }
        }
        if (liEnd === -1) break;
        
        const liContent = html.substring(contentStart, liEnd);
        
        // 分离文本和嵌套列表
        let textParts = [];
        let childLists = [];
        let tempPos = 0;
        while (tempPos < liContent.length) {
            const olStart = liContent.indexOf('<ol', tempPos);
            const ulStart = liContent.indexOf('<ul', tempPos);
            let listStart = -1;
            let listTag = '';
            if (olStart !== -1 && (ulStart === -1 || olStart < ulStart)) {
                listStart = olStart;
                listTag = 'ol';
            } else if (ulStart !== -1) {
                listStart = ulStart;
                listTag = 'ul';
            }
            if (listStart === -1) {
                textParts.push(liContent.substring(tempPos));
                break;
            }
            textParts.push(liContent.substring(tempPos, listStart));
            // 找到匹配的 </ol> 或 </ul>
            const closeTag = '</' + listTag + '>';
            let listDepth = 1;
            let listSearchPos = listStart + listTag.length + 1;
            let listEnd = -1;
            while (listSearchPos < liContent.length && listDepth > 0) {
                const nextO = liContent.indexOf('<' + listTag, listSearchPos);
                const nextC = liContent.indexOf(closeTag, listSearchPos);
                if (nextC === -1) break;
                if (nextO !== -1 && nextO < nextC) {
                    listDepth++;
                    listSearchPos = nextO + listTag.length + 1;
                } else {
                    listDepth--;
                    if (listDepth === 0) listEnd = nextC;
                    listSearchPos = nextC + closeTag.length;
                }
            }
            if (listEnd === -1) {
                textParts.push(liContent.substring(tempPos));
                break;
            }
            // 提取列表标签的属性
            const listTagMatch = liContent.substring(listStart).match(new RegExp('<' + listTag + '([^>]*)>'));
            const listAttrs = listTagMatch ? listTagMatch[1] : '';
            const fullTagLen = listTagMatch ? listTagMatch[0].length : (listTag.length + 2);
            const listInner = liContent.substring(listStart + fullTagLen, listEnd);
            childLists.push({attrs: listAttrs, tag: listTag, inner: listInner});
            tempPos = listEnd + closeTag.length;
        }
        
        // 清理文本中的 HTML 标签
        let text = textParts.join('').replace(/<[^>]+>/g, '').trim();
        
        // 生成当前行
        if (parentTag === 'ol') {
            result += indent + numStr(idx) + '. ' + text + '\n';
            idx++;
        } else {
            result += indent + '- ' + text + '\n';
        }
        
        // 递归处理子列表
        for (const child of childLists) {
            result += convertListTreeToMd(child.inner, child.attrs, child.tag, depth + 1);
        }
        
        pos = liEnd + 5;
    }
    return result;
}

function htmlToMarkdown(html) {
    if (!html || !html.trim()) return '';
    let md = html;
    // 清理：零宽空格占位符（用于在图片前后放置光标时的辅助）
    md = md.replace(/\u200B/g, '');
    // 预处理：清理编辑器内图片包装（先移除 corner/center 子div，再移除容器 div 保留 img 标签）
    md = md.replace(/<div[^>]*class="[^"]*editor-img-(corner|center)[^"]*"[^>]*>\s*<\/div>/gi, '');
    md = md.replace(/<div[^>]*data-editor-img-container[^>]*>([\s\S]*?)<\/div>/gi, function(match, inner) {
        const imgMatch = inner.match(/<img[^>]*>/i);
        if (!imgMatch) return '';
        let imgTag = imgMatch[0];
        const containerOrigMatch = match.match(/data-original="([^"]*)"/i);
        if (containerOrigMatch && imgTag.indexOf('data-original') === -1) {
            imgTag = imgTag.replace(/<img/, '<img data-original="' + containerOrigMatch[1] + '"');
        }
        return imgTag + '\n\n';
    });
    // 标题
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
    md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
    md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n');
    // 加粗
    md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
    md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
    // 斜体
    md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
    md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
    // 引用
    md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n');
    // 任务列表（li 中的任务，可能有嵌套列表）
    // 用循环+深度计数来正确匹配嵌套 li
    let taskResults = [];
    let mdForTask = md;
    while (/<li[^>]*style="[^"]*list-style-type:\s*none[^"]*"[^>]*>/i.test(mdForTask)) {
        const startMatch = mdForTask.match(/<li[^>]*style="[^"]*list-style-type:\s*none[^"]*"[^>]*>/i);
        if (!startMatch) break;
        const startIdx = startMatch.index;
        const contentStart = startIdx + startMatch[0].length;
        let depth = 1;
        let pos = contentStart;
        let endIdx = -1;
        while (pos < mdForTask.length && depth > 0) {
            const nextOpen = mdForTask.indexOf('<li', pos);
            const nextClose = mdForTask.indexOf('</li>', pos);
            if (nextClose === -1) break;
            if (nextOpen !== -1 && nextOpen < nextClose) {
                depth++;
                pos = nextOpen + 3;
            } else {
                depth--;
                if (depth === 0) endIdx = nextClose;
                pos = nextClose + 5;
            }
        }
        if (endIdx === -1) break;
        const inner = mdForTask.substring(contentStart, endIdx);
        const divMatch = inner.match(/<div[^>]*data-task="true"[^>]*>\s*<input[^>]*type="checkbox"[^>]*>(?:\s*<\/input>)?\s*<span[^>]*>([\s\S]*?)<\/span>\s*<\/div>/i);
        if (divMatch) {
            const taskText = divMatch[1];
            const isChecked = /checked/i.test(divMatch[0]);
            const afterDiv = inner.replace(divMatch[0], '');
            // afterDiv 中可能包含嵌套列表（ol/ul），保留它们让后续 convertNestedListsToMd 处理
            // 只移除非列表的 HTML 标签
            const afterDivClean = afterDiv.replace(/<(?!\/?(?:ol|ul|li)\b)[^>]+>/g, '').replace(/<\/(?!ol|ul|li)\b[^>]*>/g, '').trim();
            taskResults.push((isChecked ? '- [x] ' : '- [ ] ') + taskText + (afterDivClean ? '\n' + afterDivClean : ''));
            mdForTask = mdForTask.substring(0, startIdx) + '\nTASK_PLACEHOLDER_' + (taskResults.length - 1) + '\n' + mdForTask.substring(endIdx + 5);
        } else {
            break;
        }
    }
    // 将处理后的 md 用于后续
    md = mdForTask;
    // div 形式的任务（支持 checked 状态）
    md = md.replace(/<div[^>]*data-task="true"[^>]*>\s*<input[^>]*type="checkbox"[^>]*>(?:\s*<\/input>)?\s*<span[^>]*>(.*?)<\/span>\s*<\/div>/gi, function(match, text) {
        const checked = /checked/i.test(match);
        return (checked ? '- [x] ' : '- [ ] ') + text + '\n';
    });
    // 有序列表（逐层处理以支持嵌套）
    md = convertNestedListsToMd(md, 'ol');
    // 无序列表（逐层处理以支持嵌套）
    md = convertNestedListsToMd(md, 'ul');
    // 兜底：处理没有包裹在 ul/ol 中的 li
    md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
    md = md.replace(/<\/?[uo]l[^>]*>/gi, '');
    // 图片（保留 data-original 原图URL信息：编码到 alt 中，前缀 ORIGINAL:）
    md = md.replace(/<img[^>]*>/gi, function(imgTag) {
        const srcMatch = imgTag.match(/src="([^"]*)"/i);
        const origMatch = imgTag.match(/data-original="([^"]*)"/i);
        if (!srcMatch) return '';
        const src = srcMatch[1];
        if (origMatch && origMatch[1]) {
            return '![ORIGINAL:' + origMatch[1] + '](' + src + ')\n\n';
        }
        return '![](' + src + ')\n\n';
    });
    // 链接
    md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
    // 代码块
    md = md.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gi, '```\n$1\n```\n\n');
    // 行内代码
    md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
    // 分割线
    md = md.replace(/<hr[^>]*>/gi, '\n---\n\n');
    // 换行
    md = md.replace(/<br[^>]*>/gi, '\n');
    // 段落
    md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
    // div
    md = md.replace(/<div[^>]*>(.*?)<\/div>/gi, '$1\n');
    // 清理剩余标签
    md = md.replace(/<[^>]+>/g, '');
    // 清理 HTML 实体
    md = md.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    // 清理多余空行
    md = md.replace(/\n{3,}/g, '\n\n').trim();
    // 替换任务列表占位符
    taskResults.forEach((result, i) => {
        md = md.replace('TASK_PLACEHOLDER_' + i, result);
    });
    // 任务列表的嵌套列表可能还没被转换，再处理一次
    md = convertNestedListsToMd(md, 'ol');
    md = convertNestedListsToMd(md, 'ul');
    return md;
}

// Markdown 转 HTML（打开编辑器时用）
// 判断一行是否是列表项（包括缩进的子列表）
function isListLine(line) {
    const t = line.trim();
    return /^- /.test(t) || /^\d+\. /.test(t) || /^[a-zA-Z]\. /.test(t) || /^[ivxIVX]+\. /.test(t);
}

// 获取列表项的缩进级别（每级3个空格或1个tab）
function getIndentLevel(line) {
    const match = line.match(/^(\s*)/);
    if (!match) return 0;
    const spaces = match[1].replace(/\t/g, '   ').length;
    return Math.floor(spaces / 3);
}

// 判断列表项类型
function getListItemType(line) {
    const t = line.trim();
    if (/^- /.test(t)) return 'ul';
    return 'ol';
}

// 为嵌套列表添加层级样式（通过后处理 HTML 字符串）
function applyNestListStyles(html) {
    // 处理有序列表嵌套：ol > ol 第二层用 lower-alpha，第三层用 lower-roman
    html = html.replace(/(<ol>)(<li>)/g, '$1$2'); // 根层保持 decimal
    // 给非根层的 ol 添加样式（通过匹配嵌套在 li 内的 ol）
    let depth = 0;
    let result = '';
    for (let j = 0; j < html.length; j++) {
        if (html.substr(j, 4) === '<ol>') {
            if (depth > 0) {
                const style = depth === 1 ? ' style="list-style-type:lower-alpha"' : ' style="list-style-type:lower-roman"';
                result += '<ol' + style + '>';
            } else {
                result += '<ol>';
            }
            depth++;
            j += 3;
        } else if (html.substr(j, 5) === '</ol>') {
            depth--;
            result += '</ol>';
            j += 4;
        } else if (html.substr(j, 4) === '<ul>') {
            if (depth > 0) {
                const style = depth === 1 ? ' style="list-style-type:circle"' : ' style="list-style-type:square"';
                result += '<ul' + style + '>';
            } else {
                result += '<ul>';
            }
            depth++;
            j += 3;
        } else if (html.substr(j, 5) === '</ul>') {
            depth--;
            result += '</ul>';
            j += 4;
        } else {
            result += html[j];
        }
    }
    return result;
}

// 解析嵌套列表，返回 HTML 字符串
// 使用递归方式确保子列表嵌套在父 <li> 内部
function parseNestedList(lines, startIdx, rootType) {
    let i = startIdx;
    const baseIndent = getIndentLevel(lines[i]);
    const tag = rootType;
    let html = '<' + tag + '>';

    while (i < lines.length && isListLine(lines[i])) {
        const line = lines[i];
        const indent = getIndentLevel(line);
        const trimmed = line.trim();

        if (indent < baseIndent) break; // 回到更外层，停止

        if (indent === baseIndent) {
            // 同级列表项
            const liType = getListItemType(trimmed);
            let text = trimmed.replace(/^-\s+|^\d+\.\s+|^[a-zA-Z]\.\s+|^[ivxIVX]+\.\s+/, '');
            const escaped = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
            const richText = escaped.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\*(.*?)\*/g,'<em>$1</em>');

            // 检查下一行是否是子列表
            let hasSublist = (i + 1 < lines.length && isListLine(lines[i + 1]) && getIndentLevel(lines[i + 1]) > baseIndent);

            html += '<li>' + richText;
            if (hasSublist) {
                // 递归处理子列表
                const subType = getListItemType(lines[i + 1].trim());
                const subResult = parseNestedList(lines, i + 1, subType);
                html += subResult.html;
                i = subResult.nextIdx;
                html += '</li>';
            } else {
                html += '</li>';
                i++;
            }
        } else {
            // 缩进大于当前层级，跳过（由递归处理）
            break;
        }
    }

    html += '</' + tag + '>';
    return { html: html, nextIdx: i };
}

function markdownToHtml(md) {
    if (!md || !md.trim()) return '';
    // 先按行处理，再按段落合并
    const lines = md.split('\n');
    let result = [];
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();
        // 空行
        if (!trimmed) { i++; continue; }
        // 标题
        if (/^#{1,5} /.test(trimmed)) {
            const level = trimmed.match(/^(#{1,5}) /)[1].length;
            const text = trimmed.replace(/^#{1,5} /, '');
            const escaped = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
            const richText = escaped.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\*(.*?)\*/g,'<em>$1</em>');
            result.push('<h' + level + '>' + richText + '</h' + level + '>');
            i++; continue;
        }
        // 引用
        if (/^> /.test(trimmed)) {
            const text = trimmed.replace(/^> /, '');
            const escaped = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
            result.push('<blockquote>' + escaped + '</blockquote>');
            i++; continue;
        }
        // 任务列表
        if (/^- \[ \] /.test(trimmed) || /^- \[x\] /.test(trimmed)) {
            const checked = /^- \[x\]/i.test(trimmed);
            const text = trimmed.replace(/^- \[.\] /, '');
            const escaped = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
            const style = checked ? 'display:flex;align-items:center;gap:4px;margin:4px 0;opacity:0.5;text-decoration:line-through;text-decoration-color:var(--theme-primary, #3B82F6)' : 'display:flex;align-items:center;gap:4px;margin:4px 0';
            const accentStyle = checked ? ' style="margin:0;flex-shrink:0;accent-color:var(--theme-primary, #3B82F6)"' : ' style="margin:0;flex-shrink:0"';
            result.push('<div data-task="true" style="' + style + '" contenteditable="false"><input type="checkbox"' + (checked ? ' checked' : '') + ' onclick="handleTaskCheck(this)"' + accentStyle + '><span style="flex:1;min-width:0" contenteditable="false">' + escaped + '</span></div>');
            i++; continue;
        }
        // 无序列表（支持嵌套缩进）
        if (/^- /.test(trimmed)) {
            const listResult = parseNestedList(lines, i, 'ul');
            listResult.html = applyNestListStyles(listResult.html);
            result.push(listResult.html);
            i = listResult.nextIdx;
            continue;
        }
        // 有序列表（支持嵌套缩进，匹配 数字. 或 字母. 或 罗马数字.）
        if (/^\d+\. /.test(trimmed) || /^[a-zA-Z]\. /.test(trimmed) || /^[ivxIVX]+\. /.test(trimmed)) {
            const listResult = parseNestedList(lines, i, 'ol');
            listResult.html = applyNestListStyles(listResult.html);
            result.push(listResult.html);
            i = listResult.nextIdx;
            continue;
        }
        // 图片（支持普通URL和base64数据URI，支持保留原图URL：alt 中 ORIGINAL:前缀表示原图）
        if (/^!\[/.test(trimmed)) {
            // 匹配图片标记：![alt](url) 或 ![alt](data:image/xxx;base64,xxx)
            let imgMatch;
            const dataUriMatch = trimmed.match(/^!\[(.*?)\]\((data:image\/[^;]+;base64,[^\)]+)\)/);
            if (dataUriMatch) {
                imgMatch = dataUriMatch;
            } else {
                const urlMatch = trimmed.match(/^!\[(.*?)\]\(([^)]+)\)/);
                if (urlMatch) {
                    imgMatch = urlMatch;
                }
            }
            if (imgMatch) {
                const altText = imgMatch[1] || '';
                const url = imgMatch[2];
                // 检测是否有 ORIGINAL:前缀，表示有原图URL
                if (altText.indexOf('ORIGINAL:') === 0) {
                    const originalUrl = altText.substring('ORIGINAL:'.length);
                    result.push('<img src="' + url + '" data-original="' + originalUrl + '" style="max-width:100%;border-radius:12px;margin:8px 0" decoding="async">');
                } else {
                    result.push('<img src="' + url + '" alt="' + altText + '" style="max-width:100%;border-radius:12px;margin:8px 0" decoding="async">');
                }
                i++; continue;
            }
        }
        // 分割线
        if (/^---$/.test(trimmed)) {
            result.push('<hr>');
            i++; continue;
        }
        // 普通段落（收集连续非空、非特殊行）
        let paraLines = [];
        while (i < lines.length && lines[i].trim() && !/^#{1,5} /.test(lines[i].trim()) && !/^> /.test(lines[i].trim()) && !/^- \[.\] /.test(lines[i].trim()) && !/^- /.test(lines[i].trim()) && !/^\d+\. /.test(lines[i].trim()) && !/^---$/.test(lines[i].trim()) && !/^!\[/.test(lines[i].trim())) {
            const escaped = lines[i].replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
            const richText = escaped.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\*(.*?)\*/g,'<em>$1</em>').replace(/`([^`]+)`/g,'<code style="background:#f3f4f6;color:#ef4444;padding:2px 6px;border-radius:4px;font-size:13px">$1</code>');
            paraLines.push(richText);
            i++;
        }
        if (paraLines.length > 0) {
            result.push('<p>' + paraLines.join('<br>') + '</p>');
        }
    }
    return result.join('');
}

function renderDetailTypeList() {
    const container = document.getElementById('detailTypeList');
    if (!container) return;
    const theme = THEMES[currentTheme] || THEMES.blue;
    container.innerHTML = tags.filter(t => t.id !== 'all' && !t.system).map(tag => {
        const isSelected = tag.name === detailSelectedType;
        return `<button onclick="selectDetailType('${tag.name}')" class="detail-type-tag px-4 py-2 rounded-full text-[13px] whitespace-nowrap border border-transparent"
            data-type="${tag.name}"
            style="background: ${isSelected ? theme.primary : theme.primaryFaint}; color: ${isSelected ? '#fff' : theme.primaryDark}">
            ${tag.emoji || ''} ${tag.name}
        </button>`;
    }).join('');
}

function selectDetailType(type) { detailSelectedType = type; updateDetailTypeButtons(); const h = document.getElementById('detailTypeHint'); if (h) h.classList.add('hidden'); }
function updateDetailTypeButtons() {
    const theme = THEMES[currentTheme] || THEMES.blue;
    document.querySelectorAll('.detail-type-tag').forEach(btn => {
        if (btn.dataset.type === detailSelectedType) { btn.style.background = theme.primary; btn.style.color = '#fff'; }
        else { btn.style.background = theme.primaryFaint; btn.style.color = theme.primaryDark; }
    });
}
// saveDetail 已改为自动保存模式，保留函数供兼容性调用
function saveDetail() {
    autoSaveDetail();
    closeDetailModal();
    showToast('已保存');
    checkUncategorizedEmpty();
}
function deleteFromDetail() {
    if (!detailTargetId) return;
    const id = detailTargetId;
    // 删除按钮垃圾桶动画（主题色底+白色SVG，与批量删除一致）
    const btn = document.getElementById('detailDeleteBtn');
    const icon = document.getElementById('detailDeleteIcon');
    if (btn && icon) {
        const theme = THEMES[currentTheme] || THEMES.blue;
        icon.getAnimations().forEach(a => a.cancel());
        btn.style.background = theme.primary;
        btn.style.color = '#fff';
        icon.setAttribute('stroke', '#fff');
        icon.animate([
            { transform: 'rotate(0deg) scale(1) translateY(0)' },
            { transform: 'rotate(-15deg) scale(0.4) translateY(-4px)', offset: 0.2 },
            { transform: 'rotate(10deg) scale(0.7) translateY(2px)', offset: 0.45 },
            { transform: 'rotate(-5deg) scale(1.12) translateY(-1px)', offset: 0.7 },
            { transform: 'rotate(0deg) scale(1) translateY(0)' }
        ], { duration: 500, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
    }
    closeDetailModal();
    deleteTargetId = id;
    const item = items.find(i => i.id === id);
    const nameEl = document.getElementById('deleteItemName');
    if (item && item.title) { nameEl.textContent = item.title; nameEl.classList.remove('hidden'); }
    else nameEl.classList.add('hidden');
    document.getElementById('deleteModalTitle').textContent = '删除此灵感？';
    document.getElementById('deleteModalDesc').textContent = '删除后可在回收站恢复';
    document.getElementById('deleteModal').classList.remove('hidden');
    // 垃圾桶特效（只动 SVG 图标，循环直到弹窗关闭）
    const iconSvg = document.getElementById('deleteIcon');
    if (iconSvg) {
        iconSvg.getAnimations().forEach(a => a.cancel());
        iconSvg.animate([
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(-20deg) scale(0.3)', offset: 0.2 },
            { transform: 'rotate(15deg) scale(0.6)', offset: 0.45 },
            { transform: 'rotate(-8deg) scale(1.15)', offset: 0.7 },
            { transform: 'rotate(0deg) scale(1)' }
        ], { duration: 1500, iterations: Infinity, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
    }
    // 恢复删除按钮样式
    setTimeout(() => {
        if (btn) { btn.style.background = ''; btn.style.color = ''; }
        if (icon) icon.setAttribute('stroke', 'currentColor');
    }, 600);
}

// ===== 置顶（pin/unpin）=====
function updatePinBtnState(isPinned) {
    const btn = document.getElementById('pinBtn');
    const icon = document.getElementById('pinBtnIcon');
    const text = document.getElementById('pinBtnText');
    if (!btn || !icon || !text) return;
    icon.getAnimations().forEach(a => a.cancel());
    if (isPinned) {
        text.textContent = '取消置顶';
        btn.style.background = 'var(--theme-primary-light, #DBEAFE)';
        btn.style.color = 'var(--theme-primary-dark, #2563EB)';
        // 已置顶：实心pin针，带旋转缩放动画（与FAB变形一致）
        icon.innerHTML = '<path d="M16 12V4H17V2H7V4H8V12L6 14V16H11.2V22H12.8V16H18V14L16 12Z"/>';
        icon.style.opacity = '1';
        icon.animate([
            { transform: 'rotate(45deg) scale(0.3)', opacity: 0 },
            { transform: 'rotate(-10deg) scale(1.15)', opacity: 1, offset: 0.5 },
            { transform: 'rotate(0deg) scale(1)', opacity: 1 }
        ], { duration: 500, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
    } else {
        text.textContent = '置顶';
        btn.style.background = '';
        btn.style.color = '';
        // 未置顶：空心/浅色pin针，带旋转缩放动画
        icon.innerHTML = '<path d="M16 12V4H17V2H7V4H8V12L6 14V16H11.2V22H12.8V16H18V14L16 12Z"/>';
        icon.style.opacity = '0.4';
        icon.animate([
            { transform: 'rotate(0deg) scale(1)', opacity: 1 },
            { transform: 'rotate(20deg) scale(1.1)', opacity: 0.8, offset: 0.3 },
            { transform: 'rotate(45deg) scale(0.8)', opacity: 0.4 }
        ], { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
    }
}

function pinItem() {
    if (!detailTargetId) return;
    const item = items.find(i => i.id === detailTargetId);
    if (!item) return;
    item.pinned = !item.pinned;
    if (item.pinned) item.pinnedAt = Date.now();
    saveItems();
    // 标记高亮并返回主页
    item._highlight = true;
    _detailNeedsRerender = true; // 置顶改变了排序，需要重新渲染
    showFabCheckmark();
    closeDetailModal();
    showToast(item.pinned ? '已置顶' : '已取消置顶');
}

function unpinFromCard(id) {
    const item = items.find(i => i.id === id);
    if (!item || !item.pinned) return;
    item.pinned = false;
    saveItems();
    renderFeed(true);
    showToast('已取消置顶');
}

// 正常模式下点击 pin 针切换置顶
function togglePin(id) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    item.pinned = !item.pinned;
    if (item.pinned) item.pinnedAt = Date.now();
    saveItems();

    if (item.pinned) item._highlight = true;
    showFabCheckmark();
    renderFeed(true, item.pinned);
    showToast(item.pinned ? '已置顶' : '已取消置顶');
}

function togglePinFromBatch(id) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    const wasPinned = item.pinned;
    item.pinned = !item.pinned;
    if (item.pinned) item.pinnedAt = Date.now();
    saveItems();

    if (item.pinned) item._highlight = true;
    showFabCheckmark();
    renderFeed(true, item.pinned);
    showToast(item.pinned ? '已置顶' : '已取消置顶');
    // 更新 FAB 状态（加号 ↔ pin 针）
    updateFabState();
}

// FAB 短暂显示✅动画（与 toast 同步：300ms 出现，2s 后 300ms 消失）
let fabCheckTimer = null;
let fabCheckActive = false; // ✅动画进行中标志
function showFabCheckmark() {
    const fabMain = document.getElementById('fabMain');
    const fabMainIcon = document.getElementById('fabMainIcon');
    if (!fabMain || !fabMainIcon) return;
    const theme = THEMES[currentTheme] || THEMES.blue;
    // 防抖：取消上一次未完成的✅
    if (fabCheckTimer) { clearTimeout(fabCheckTimer); fabCheckTimer = null; }
    fabCheckActive = true;
    fabMainIcon.getAnimations().forEach(a => a.cancel());
    fabMainIcon.classList.remove('fab-icon-spin'); // 移除 spin，避免 CSS 动画覆盖
    fabMain.style.background = theme.primary;
    fabMain.style.boxShadow = `0 4px 20px ${theme.primary}55`;
    fabMainIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>';
    fabMainIcon.setAttribute('stroke', '#fff');
    fabMainIcon.setAttribute('fill', 'none');
    fabMainIcon.setAttribute('stroke-width', '2.5');
    fabMainIcon.style.color = '#fff';
    // ✅ 出现动画
    fabMainIcon.animate([
        { transform: 'scale(0) rotate(-45deg)', opacity: 0 },
        { transform: 'scale(1.2) rotate(0deg)', opacity: 1, offset: 0.5 },
        { transform: 'scale(1) rotate(0deg)', opacity: 1 }
    ], { duration: 300, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' });
    // 2s 后恢复（与 toast 淡出同步）
    fabCheckTimer = setTimeout(() => {
        fabCheckTimer = null;
        fabMainIcon.animate([
            { transform: 'scale(1) rotate(0deg)', opacity: 1 },
            { transform: 'scale(0) rotate(45deg)', opacity: 0 }
        ], { duration: 300, easing: 'ease-in', fill: 'forwards' }).onfinish = () => {
            fabCheckActive = false;
            updateFabState();
        };
    }, 2000);
}

// FAB 短暂显示布局图标动画（与 showFabCheckmark 一致，但显示的是布局图标）
function showFabLayoutIcon() {
    const fabMain = document.getElementById('fabMain');
    const fabMainIcon = document.getElementById('fabMainIcon');
    if (!fabMain || !fabMainIcon) return;
    const theme = THEMES[currentTheme] || THEMES.blue;
    // 防抖：取消上一次未完成的动画
    if (fabCheckTimer) { clearTimeout(fabCheckTimer); fabCheckTimer = null; }
    fabCheckActive = true;
    fabMainIcon.getAnimations().forEach(a => a.cancel());
    fabMainIcon.classList.remove('fab-icon-spin');
    fabMain.style.background = theme.primary;
    fabMain.style.boxShadow = `0 4px 20px ${theme.primary}55`;
    // 根据当前布局显示对应图标
    const isMasonry = currentLayout === 'masonry';
    fabMainIcon.innerHTML = isMasonry
        ? '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>'
        : '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>';
    fabMainIcon.setAttribute('stroke', '#fff');
    fabMainIcon.setAttribute('fill', 'none');
    fabMainIcon.setAttribute('stroke-width', '2');
    fabMainIcon.style.color = '#fff';
    // 图标出现动画
    fabMainIcon.animate([
        { transform: 'scale(0) rotate(-45deg)', opacity: 0 },
        { transform: 'scale(1.2) rotate(0deg)', opacity: 1, offset: 0.5 },
        { transform: 'scale(1) rotate(0deg)', opacity: 1 }
    ], { duration: 300, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' });
    // 2s 后恢复
    fabCheckTimer = setTimeout(() => {
        fabCheckTimer = null;
        fabMainIcon.animate([
            { transform: 'scale(1) rotate(0deg)', opacity: 1 },
            { transform: 'scale(0) rotate(45deg)', opacity: 0 }
        ], { duration: 300, easing: 'ease-in', fill: 'forwards' }).onfinish = () => {
            fabCheckActive = false;
            updateFabState();
        };
    }, 2000);
}

// ===== 其他 =====
// ===== Banner 管理 =====
const bannerDismissed = [false, false];
let bannerTimer = null;
let currentBannerIndex = 0;

function closeBanner(index) {
    bannerDismissed[index] = true;
    const scroll = document.getElementById('bannerScroll');
    if (!scroll) return;
    const banners = scroll.children;
    if (banners[index]) {
        banners[index].style.display = 'none';
    }
    stopBannerAutoPlay();
    // 如果所有 banner 都关闭了，隐藏整个区域
    if (bannerDismissed.every(v => v)) {
        document.getElementById('welcomeCard').style.display = 'none';
    } else {
        updateBannerDots();
        // 重置索引
        currentBannerIndex = 0;
        startBannerAutoPlay();
    }
}

function getVisibleBanners() {
    const scroll = document.getElementById('bannerScroll');
    if (!scroll) return [];
    return Array.from(scroll.children).filter(b => b.style.display !== 'none');
}

function scrollToBanner(index) {
    const scroll = document.getElementById('bannerScroll');
    const visibleBanners = getVisibleBanners();
    if (!scroll || visibleBanners.length <= 1 || index >= visibleBanners.length) return;
    const bannerWidth = visibleBanners[0].offsetWidth + 12;
    scroll.scrollTo({ left: bannerWidth * index, behavior: 'smooth' });
    currentBannerIndex = index;
    stopBannerAutoPlay();
    startBannerAutoPlay();
}

function updateBannerDots() {
    const dotsContainer = document.getElementById('bannerDots');
    const visibleBanners = getVisibleBanners();
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    visibleBanners.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = `h-1.5 rounded-full transition-all banner-dot cursor-pointer ${i === currentBannerIndex ? 'w-5' : 'w-1.5 bg-gray-300'}`;
        if (i === currentBannerIndex) btn.style.background = 'var(--theme-primary, #3B82F6)';
        btn.onclick = () => scrollToBanner(i);
        dotsContainer.appendChild(btn);
    });
    if (visibleBanners.length <= 1) dotsContainer.style.display = 'none';
    else dotsContainer.style.display = '';
}

function startBannerAutoPlay() {
    stopBannerAutoPlay();
    const visibleBanners = getVisibleBanners();
    if (visibleBanners.length <= 1) return;
    bannerTimer = setInterval(() => {
        const visibleBanners = getVisibleBanners();
        if (visibleBanners.length <= 1) { stopBannerAutoPlay(); return; }
        currentBannerIndex = (currentBannerIndex + 1) % visibleBanners.length;
        scrollToBanner(currentBannerIndex);
    }, 3000);
}

function stopBannerAutoPlay() {
    if (bannerTimer) { clearInterval(bannerTimer); bannerTimer = null; }
}

function initBannerScroll() {
    const scroll = document.getElementById('bannerScroll');
    if (!scroll) return;
    // 滚动时更新指示点和索引
    scroll.addEventListener('scroll', () => {
        const scrollLeft = scroll.scrollLeft;
        const visibleBanners = getVisibleBanners();
        const dots = document.querySelectorAll('.banner-dot');
        if (visibleBanners.length <= 1 || dots.length === 0) return;
        const bannerWidth = visibleBanners[0].offsetWidth + 12;
        const newIndex = Math.round(scrollLeft / bannerWidth);
        if (newIndex !== currentBannerIndex) {
            currentBannerIndex = newIndex;
        }
        dots.forEach((dot, i) => {
            if (i === currentBannerIndex) {
                dot.classList.add('w-5');
                dot.classList.remove('w-1.5', 'bg-gray-300');
                dot.style.background = 'var(--theme-primary, #3B82F6)';
            } else {
                dot.classList.remove('w-5');
                dot.classList.add('w-1.5', 'bg-gray-300');
                dot.style.background = '';
            }
        });
    });
    // 触摸时暂停自动轮播
    scroll.addEventListener('touchstart', () => stopBannerAutoPlay(), { passive: true });
    scroll.addEventListener('touchend', () => startBannerAutoPlay(), { passive: true });
    // 启动自动轮播
    startBannerAutoPlay();
}

function initBannerHoverPause() {
    const scroll = document.getElementById('bannerScroll');
    if (!scroll) return;
    scroll.addEventListener('mouseenter', () => stopBannerAutoPlay());
    scroll.addEventListener('mouseleave', () => startBannerAutoPlay());
}
// ===== 回收站 =====
const RECYCLE_BIN_KEY = 'gator_recycle_bin';
let recycleBin = [];

function loadRecycleBin() {
    try { const s = localStorage.getItem(RECYCLE_BIN_KEY); recycleBin = s ? JSON.parse(s) : []; } catch(e) { recycleBin = []; }
}
function saveRecycleBin() { localStorage.setItem(RECYCLE_BIN_KEY, JSON.stringify(recycleBin)); }

function moveToRecycleBin(item) {
    recycleBin.unshift({
        ...item,
        deletedAt: new Date().toISOString(),
        deletedFromNotebook: currentNotebookId
    });
    saveRecycleBin();
}

function restoreFromRecycleBin(index) {
    const entry = recycleBin[index];
    if (!entry) return;
    // 恢复到原始笔记簿（如果存在），否则当前笔记簿
    const targetNotebook = entry.deletedFromNotebook || currentNotebookId;
    const key = STORAGE_KEY + '_' + targetNotebook;
    let targetItems = [];
    try { const s = localStorage.getItem(key); targetItems = s ? JSON.parse(s) : []; } catch(e) { targetItems = []; }
    // 移除 deletedAt 和 deletedFromNotebook，标记为近期恢复
    const restored = { ...entry };
    delete restored.deletedAt;
    delete restored.deletedFromNotebook;
    restored._justRestored = true;
    targetItems.unshift(restored);
    localStorage.setItem(key, JSON.stringify(targetItems));
    // 如果恢复到当前笔记簿，刷新列表
    if (targetNotebook === currentNotebookId) { loadItems(); renderFeed(); }
    recycleBin.splice(index, 1);
    saveRecycleBin();
    renderRecycleBinList();
    showToast('已恢复');
}

function permanentDeleteFromRecycleBin(index) {
    if (!confirm('确定永久删除此灵感？')) return;
    recycleBin.splice(index, 1);
    saveRecycleBin();
    renderRecycleBinList();
    showToast('已永久删除');
}

function clearRecycleBin() {
    if (recycleBin.length === 0) { showToast('回收站已经是空的'); return; }
    document.getElementById('clearRecycleBinDesc').textContent = `确定清空回收站？共 ${recycleBin.length} 条内容将永久删除，无法恢复。`;
    document.getElementById('clearRecycleBinModal').classList.remove('hidden');
    // 垃圾桶特效（与删除确认框一致）
    const iconSvg = document.getElementById('clearRecycleBinIcon');
    if (iconSvg) {
        iconSvg.getAnimations().forEach(a => a.cancel());
        iconSvg.animate([
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(-20deg) scale(0.3)', offset: 0.2 },
            { transform: 'rotate(15deg) scale(0.6)', offset: 0.45 },
            { transform: 'rotate(-8deg) scale(1.15)', offset: 0.7 },
            { transform: 'rotate(0deg) scale(1)' }
        ], { duration: 1500, iterations: Infinity, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
    }
}
function closeClearRecycleBinModal() {
    const iconSvg = document.getElementById('clearRecycleBinIcon');
    if (iconSvg) iconSvg.getAnimations().forEach(a => a.cancel());
    document.getElementById('clearRecycleBinModal').classList.add('hidden');
}
function confirmClearRecycleBin() {
    recycleBin = [];
    saveRecycleBin();
    closeClearRecycleBinModal();
    renderRecycleBinList();
    showToast('回收站已清空');
}

function restoreAllFromRecycleBin() {
    if (recycleBin.length === 0) { showToast('回收站是空的'); return; }
    document.getElementById('restoreAllDesc').textContent = `将恢复回收站中的全部 ${recycleBin.length} 条灵感`;
    document.getElementById('restoreAllModal').classList.remove('hidden');
    // 恢复图标旋转动画（反向转一圈，停顿，循环）
    const iconSvg = document.getElementById('restoreAllIcon');
    if (iconSvg) {
        iconSvg.getAnimations().forEach(a => a.cancel());
        iconSvg.animate([
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(-180deg) scale(0.85)', offset: 0.3 },
            { transform: 'rotate(-360deg) scale(1)', offset: 0.6 },
            { transform: 'rotate(-360deg) scale(1)', offset: 0.8 },
            { transform: 'rotate(-360deg) scale(1)' }
        ], { duration: 2000, iterations: Infinity, easing: 'cubic-bezier(0.77, 0, 0.175, 1)' });
    }
}
function closeRestoreAllModal() {
    const iconSvg = document.getElementById('restoreAllIcon');
    if (iconSvg) iconSvg.getAnimations().forEach(a => a.cancel());
    document.getElementById('restoreAllModal').classList.add('hidden');
}
function confirmRestoreAll() {
    recycleBin.forEach(entry => {
        const targetNotebook = entry.deletedFromNotebook || currentNotebookId;
        const key = STORAGE_KEY + '_' + targetNotebook;
        let targetItems = [];
        try { const s = localStorage.getItem(key); targetItems = s ? JSON.parse(s) : []; } catch(e) { targetItems = []; }
        const restored = { ...entry };
        delete restored.deletedAt;
        delete restored.deletedFromNotebook;
        targetItems.unshift(restored);
        localStorage.setItem(key, JSON.stringify(targetItems));
    });
    const restoredCount = recycleBin.length;
    recycleBin = [];
    saveRecycleBin();
    closeRestoreAllModal();
    loadItems();
    renderFeed();
    renderTabBar();
    renderRecycleBinList();
    showToast(`已恢复 ${restoredCount} 条灵感`);
}

function renderRecycleBinList() {
    const list = document.getElementById('recycleBinList');
    const empty = document.getElementById('recycleBinEmpty');
    if (!list || !empty) return;

    if (recycleBin.length === 0) {
        list.innerHTML = '';
        list.classList.add('hidden');
        empty.classList.remove('hidden');
        return;
    }
    empty.classList.add('hidden');
    list.classList.remove('hidden');

    list.innerHTML = recycleBin.map((entry, index) => {
        const tag = tags.find(t => t.name === entry.type);
        const tagEmoji = tag ? tag.emoji : '';
        const editTime = formatTime(entry.updatedAt || entry.createdAt);
        return `<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div class="flex-1 min-w-0">
                <p class="text-[14px] font-medium text-gray-900 truncate">${escapeHtml(entry.title || '新记录')}</p>
                <div class="flex items-center gap-2 mt-1">
                    <span class="text-[11px] px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">${tagEmoji} ${entry.type || '未分类'}</span>
                    <span class="text-[11px] text-gray-400">编辑于 ${editTime}</span>
                </div>
            </div>
            <button onclick="restoreFromRecycleBin(${index})" class="w-8 h-8 rounded-lg hover:bg-blue-50 flex items-center justify-center text-gray-400 hover:text-blue-500 transition btn-press flex-shrink-0" title="恢复">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>
            <button onclick="permanentDeleteFromRecycleBin(${index})" class="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition btn-press flex-shrink-0" title="永久删除">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
        </div>`;
    }).join('');
}

function openRecycleBin() {
    closeGearMenu();
    loadRecycleBin();
    renderRecycleBinList();
    document.getElementById('recycleBinModal').classList.remove('hidden');
}
function closeRecycleBin() { document.getElementById('recycleBinModal').classList.add('hidden'); showFabCheckmark(); }

// ===== 齿轮菜单 =====
function showSettings() {
    document.getElementById('gearMenuModal').classList.remove('hidden');
    updateTagCountSwitchUI();
    updateImagePreviewSwitchUI();
}
function closeGearMenu() { document.getElementById('gearMenuModal').classList.add('hidden'); showFabCheckmark(); }

// ===== 显示分类数量 =====
function toggleShowTagCount() {
    showTagCount = !showTagCount;
    localStorage.setItem('gator_show_tag_count', showTagCount);
    updateTagCountSwitchUI();
    renderTabBar();
    showToast(showTagCount ? '已开启分类数量显示' : '已关闭分类数量显示');
    closeGearMenu();
}

function updateTagCountSwitchUI() {
    const sw = document.getElementById('showTagCountSwitch');
    const dot = document.getElementById('showTagCountDot');
    if (!sw || !dot) return;
    if (showTagCount) {
        sw.style.background = 'var(--theme-primary, #3B82F6)';
        dot.style.transform = 'translateX(20px)';
    } else {
        sw.style.background = '#e5e7eb';
        dot.style.transform = 'translateX(0)';
    }
}

function toggleImagePreviewMode() {
    imagePreviewMode = !imagePreviewMode;
    localStorage.setItem('gator_image_preview_mode', imagePreviewMode);
    updateImagePreviewSwitchUI();
    renderFeed();
    showToast(imagePreviewMode ? '已开启首页灵感预览模式' : '已关闭首页灵感预览模式');
    closeGearMenu();
}

function updateImagePreviewSwitchUI() {
    const sw = document.getElementById('imagePreviewSwitch');
    const dot = document.getElementById('imagePreviewDot');
    if (!sw || !dot) return;
    if (imagePreviewMode) {
        sw.style.background = 'var(--theme-primary, #3B82F6)';
        dot.style.transform = 'translateX(20px)';
    } else {
        sw.style.background = '#e5e7eb';
        dot.style.transform = 'translateX(0)';
    }
}

function updateItemCount(count) {
    const el = document.getElementById('itemTotalCount');
    if (el) el.textContent = count !== undefined ? count : items.length;
}

// ===== 灵感管理 =====
function openInspirationManage() {
    closeGearMenu();
    document.getElementById('inspirationManageModal').classList.remove('hidden');
    updateTimeSortBtn();
}
function closeInspirationManage() {
    document.getElementById('inspirationManageModal').classList.add('hidden');
    exitBatchDeleteMode();
    if (batchPinMode) exitBatchPinMode();
}

function clearAllItems() {
    if (items.length === 0) { showToast('当前没有灵感'); return; }
    document.getElementById('clearAllTitle').textContent = `确认清空全部 ${items.length} 条灵感？`;
    document.getElementById('clearAllDesc').innerHTML = `删除后将放入回收站<br>可恢复`;
    document.getElementById('clearAllModal').classList.remove('hidden');
    // 垃圾桶特效（与回收站清空一致）
    const iconSvg = document.getElementById('clearAllIcon');
    if (iconSvg) {
        iconSvg.getAnimations().forEach(a => a.cancel());
        iconSvg.animate([
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(-20deg) scale(0.3)', offset: 0.2 },
            { transform: 'rotate(15deg) scale(0.6)', offset: 0.45 },
            { transform: 'rotate(-8deg) scale(1.15)', offset: 0.7 },
            { transform: 'rotate(0deg) scale(1)' }
        ], { duration: 1500, iterations: Infinity, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
    }
}
function closeClearAllModal() {
    const iconSvg = document.getElementById('clearAllIcon');
    if (iconSvg) iconSvg.getAnimations().forEach(a => a.cancel());
    document.getElementById('clearAllModal').classList.add('hidden');
}
function confirmClearAll() {
    items.forEach(item => moveToRecycleBin(item));
    items = [];
    saveItems();
    closeClearAllModal();
    closeInspirationManage();
    renderFeed();
    renderTabBar();
    showToast('已清空全部灵感');
}

// ===== 批量删除 =====
let batchDeleteMode = false;
let batchSelectedIds = new Set();

// ===== 批量置顶 =====
let batchPinMode = false;

function startBatchPin() {
    batchPinMode = true;
    document.getElementById('inspirationManageModal').classList.add('hidden');
    document.getElementById('tagGearMenuModal').classList.add('hidden');
    document.getElementById('tagGearIcon').classList.remove('spin');
    renderFeed();
    showToast('点按 pin 针即可置顶/取消置顶');
    // FAB 动效延迟 0.5s
    setTimeout(() => updateFabState(), 500);
}

function exitBatchPinMode() {
    batchPinMode = false;
    const fabMainIcon = document.getElementById('fabMainIcon');
    const fabMain = document.getElementById('fabMain');
    if (fabMainIcon && fabMain) {
        fabMainIcon.getAnimations().forEach(a => a.cancel());
        // pin 针 → 加号 反向变形动画
        const anim = fabMainIcon.animate([
            { transform: 'rotate(0deg) scale(1) translateY(0)' },
            { transform: 'rotate(90deg) scale(0.4) translateY(-6px)', offset: 0.25 },
            { transform: 'rotate(180deg) scale(0.7) translateY(3px)', offset: 0.5 },
            { transform: 'rotate(350deg) scale(1.1) translateY(-1px)', offset: 0.75 },
            { transform: 'rotate(360deg) scale(1) translateY(0)' }
        ], { duration: 500, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
        fabMainIcon.classList.remove('fab-pin-morph', 'fab-pin-idle');
        anim.onfinish = () => { updateFabState(); renderFeed(); };
    } else {
        updateFabState();
        renderFeed();
    }
}

function startBatchDelete() {
    batchDeleteMode = true;
    batchSelectedIds = new Set();
    // 直接隐藏弹窗，不调用 closeInspirationManage（它会重置 batchDeleteMode）
    document.getElementById('inspirationManageModal').classList.add('hidden');
    document.getElementById('tagGearMenuModal').classList.add('hidden');
    document.getElementById('tagGearIcon').classList.remove('spin');
    updateBatchDeleteBar();
    renderFeed();
    // FAB 动效延迟 0.5s
    setTimeout(() => updateFabState(), 500);
}

function exitBatchDeleteMode() {
    batchDeleteMode = false;
    batchSelectedIds = new Set();
    const fabMainIcon = document.getElementById('fabMainIcon');
    const fabMain = document.getElementById('fabMain');
    if (fabMainIcon && fabMain) {
        fabMainIcon.getAnimations().forEach(a => a.cancel());
        // 垃圾桶 → 加号 反向变形动画
        const anim = fabMainIcon.animate([
            { transform: 'rotate(0deg) scale(1) translateY(0)' },
            { transform: 'rotate(15deg) scale(0.4) translateY(-6px)', offset: 0.25 },
            { transform: 'rotate(-10deg) scale(0.7) translateY(3px)', offset: 0.5 },
            { transform: 'rotate(5deg) scale(1.1) translateY(-1px)', offset: 0.75 },
            { transform: 'rotate(0deg) scale(1) translateY(0)' }
        ], { duration: 500, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
        fabMainIcon.classList.remove('fab-trash-morph', 'fab-trash-idle');
        anim.onfinish = () => {
            updateFabState();
            document.getElementById('batchSelectAllBar').classList.add('hidden');
            renderFeed();
        };
    } else {
        updateFabState();
        document.getElementById('batchSelectAllBar').classList.add('hidden');
        renderFeed();
    }
}

function selectAllItems() {
    const selectAllBtn = document.getElementById('selectAllBtn');
    if (batchSelectedIds.size === items.length && items.length > 0) {
        batchSelectedIds = new Set();
        selectAllBtn.textContent = '全选';
    } else {
        items.forEach(item => batchSelectedIds.add(item.id));
        selectAllBtn.textContent = '取消全选';
    }
    updateBatchDeleteBar();
    updateFabState();
    // 直接更新所有复选框 DOM，不重新渲染
    document.querySelectorAll('.batch-checkbox-circle').forEach(checkbox => {
        const wrapper = checkbox.closest('.card-wrapper');
        const id = wrapper ? wrapper.dataset.id : null;
        if (!id) return;
        if (batchSelectedIds.has(id)) {
            checkbox.classList.add('batch-checked');
            checkbox.classList.remove('border-gray-300', 'bg-white/80');
            checkbox.style.background = 'var(--theme-primary, #3B82F6)';
            checkbox.style.borderColor = 'var(--theme-primary, #3B82F6)';
            checkbox.innerHTML = '<svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';
        } else {
            checkbox.classList.remove('batch-checked');
            checkbox.classList.add('border-gray-300', 'bg-white/80');
            checkbox.style.background = '';
            checkbox.style.borderColor = '';
            checkbox.innerHTML = '';
        }
    });
}

function toggleBatchSelect(id) {
    if (batchSelectedIds.has(id)) batchSelectedIds.delete(id);
    else batchSelectedIds.add(id);
    updateBatchDeleteBar();
    updateFabState();
    // 直接更新对应卡片的复选框样式，不重新渲染整个列表
    const wrapper = document.querySelector(`.card-wrapper[data-id="${id}"]`);
    if (wrapper) {
        const checkbox = wrapper.querySelector('.batch-checkbox-circle');
        if (checkbox) {
            if (batchSelectedIds.has(id)) {
                checkbox.classList.add('batch-checked');
                checkbox.classList.remove('border-gray-300', 'bg-white/80');
                checkbox.style.background = 'var(--theme-primary, #3B82F6)';
                checkbox.style.borderColor = 'var(--theme-primary, #3B82F6)';
                checkbox.innerHTML = '<svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';
            } else {
                checkbox.classList.remove('batch-checked');
                checkbox.classList.add('border-gray-300', 'bg-white/80');
                checkbox.style.background = '';
                checkbox.style.borderColor = '';
                checkbox.innerHTML = '';
            }
        }
    }
}

function onFabMainClick() {
    if (batchPinMode) {
        exitBatchPinMode();
    } else if (batchDeleteMode && batchSelectedIds.size > 0) {
        confirmBatchDelete();
    } else if (batchDeleteMode) {
        exitBatchDeleteMode();
    } else {
        openInputModal();
    }
}

let fabState = 'normal'; // 'normal' | 'x' | 'trash' | 'check'
let fabMorphTimer = null;

function updateFabState() {
    const fabMain = document.getElementById('fabMain');
    const fabMainIcon = document.getElementById('fabMainIcon');
    const fabSmall = document.getElementById('fabSmall');
    const fabGear = document.getElementById('fabGear');
    if (!fabMain || !fabMainIcon) return;
    const theme = THEMES[currentTheme] || THEMES.blue;

    // 计算目标状态
    let newState = 'normal';
    if (batchDeleteMode) {
        newState = batchSelectedIds.size > 0 ? 'trash' : 'x';
    } else if (batchPinMode) {
        const hasPinned = items.some(i => i.pinned);
        newState = hasPinned ? 'pin' : 'check';
    }

    // 清除之前的定时器
    if (fabMorphTimer) { clearTimeout(fabMorphTimer); fabMorphTimer = null; }

    if (batchDeleteMode || batchPinMode) {
        // 隐藏两侧小按钮
        if (fabSmall) fabSmall.style.opacity = '0';
        if (fabSmall) fabSmall.style.pointerEvents = 'none';
        if (fabGear) fabGear.style.opacity = '0';
        if (fabGear) fabGear.style.pointerEvents = 'none';
        fabMain.classList.remove('fab-pulse');

        // 清除之前的定时器
        if (fabMorphTimer) { clearTimeout(fabMorphTimer); fabMorphTimer = null; }

        if (batchPinMode && newState === 'pin') {
            // 批量置顶且有已置顶卡片：加号 → pin 针变形动画
            fabMain.style.background = theme.primary;
            fabMain.style.boxShadow = `0 4px 20px ${theme.primary}55`;
            fabMainIcon.innerHTML = '<path d="M16 12V4H17V2H7V4H8V12L6 14V16H11.2V22H12.8V16H18V14L16 12Z"/>';
            fabMainIcon.style.color = '#fff';
            fabMainIcon.setAttribute('fill', 'currentColor');
            fabMainIcon.setAttribute('stroke', 'none');
            fabMainIcon.getAnimations().forEach(a => a.cancel());
            const pinMorphAnim = fabMainIcon.animate([
                { transform: 'rotate(0deg) scale(1) translateY(0)' },
                { transform: 'rotate(-90deg) scale(0.3) translateY(-8px)', offset: 0.25 },
                { transform: 'rotate(180deg) scale(0.6) translateY(4px)', offset: 0.5 },
                { transform: 'rotate(350deg) scale(1.15) translateY(-2px)', offset: 0.75 },
                { transform: 'rotate(360deg) scale(1) translateY(0)' }
            ], { duration: 700, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' });
            pinMorphAnim.onfinish = () => {
                fabMainIcon.animate([
                    { transform: 'translateY(0) rotate(0deg)', filter: 'drop-shadow(0 0 0px transparent)' },
                    { transform: 'translateY(-3px) rotate(-5deg)', filter: 'drop-shadow(0 2px 6px ' + theme.primary + '80)', offset: 0.3 },
                    { transform: 'translateY(-1px) rotate(3deg)', filter: 'drop-shadow(0 4px 12px ' + theme.primary + 'B3)', offset: 0.6 },
                    { transform: 'translateY(0) rotate(0deg)', filter: 'drop-shadow(0 0 0px transparent)' }
                ], { duration: 2500, iterations: Infinity, easing: 'ease-in-out' });
            };
        } else if (batchPinMode) {
            // 批量置顶无已置顶卡片：加号 + 呼吸动画
            fabMain.style.background = theme.primary;
            fabMain.style.boxShadow = `0 4px 20px ${theme.primary}55`;
            fabMainIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>';
            fabMainIcon.style.color = '#fff';
            fabMainIcon.setAttribute('stroke', 'currentColor');
            fabMainIcon.setAttribute('fill', 'none');
            fabMainIcon.getAnimations().forEach(a => a.cancel());
            fabMainIcon.animate([
                { transform: 'translateY(0) rotate(0deg)', filter: 'drop-shadow(0 0 0px transparent)' },
                { transform: 'translateY(-3px) rotate(-5deg)', filter: 'drop-shadow(0 2px 6px ' + theme.primary + '80)', offset: 0.3 },
                { transform: 'translateY(-1px) rotate(3deg)', filter: 'drop-shadow(0 4px 12px ' + theme.primary + 'B3)', offset: 0.6 },
                { transform: 'translateY(0) rotate(0deg)', filter: 'drop-shadow(0 0 0px transparent)' }
            ], { duration: 2500, iterations: Infinity, easing: 'ease-in-out' });
        } else if (batchDeleteMode && newState === 'trash') {
            // 批量删除已选项目：垃圾桶
            fabMain.style.background = theme.primary;
            fabMain.style.boxShadow = `0 4px 16px ${theme.primary}66`;
            fabMainIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>';
            fabMainIcon.style.color = '#fff';
            fabMainIcon.setAttribute('stroke', 'currentColor');
            fabMainIcon.setAttribute('fill', 'none');
            fabMainIcon.getAnimations().forEach(a => a.cancel());
            fabMainIcon.animate([
                { transform: 'rotate(0deg) scale(1) translateY(0)' },
                { transform: 'rotate(-15deg) scale(0.4) translateY(-6px)', offset: 0.2 },
                { transform: 'rotate(10deg) scale(0.7) translateY(3px)', offset: 0.45 },
                { transform: 'rotate(-5deg) scale(1.12) translateY(-2px)', offset: 0.7 },
                { transform: 'rotate(0deg) scale(1) translateY(0)' }
            ], { duration: 700, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
        } else if (batchDeleteMode) {
            // 批量删除模式：垃圾桶 + 摇晃呼吸
            fabMain.style.background = theme.primary;
            fabMain.style.boxShadow = `0 4px 20px ${theme.primary}55`;
            fabMainIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>';
            fabMainIcon.style.color = '#fff';
            fabMainIcon.setAttribute('stroke', 'currentColor');
            fabMainIcon.setAttribute('fill', 'none');
            fabMainIcon.getAnimations().forEach(a => a.cancel());
            const trashMorphAnim = fabMainIcon.animate([
                { transform: 'rotate(0deg) scale(1) translateY(0)' },
                { transform: 'rotate(-15deg) scale(0.4) translateY(-6px)', offset: 0.2 },
                { transform: 'rotate(10deg) scale(0.7) translateY(3px)', offset: 0.45 },
                { transform: 'rotate(-5deg) scale(1.12) translateY(-2px)', offset: 0.7 },
                { transform: 'rotate(0deg) scale(1) translateY(0)' }
            ], { duration: 700, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
            trashMorphAnim.onfinish = () => {
                fabMainIcon.animate([
                    { transform: 'rotate(0deg) translateY(0)', filter: 'drop-shadow(0 0 0px transparent)' },
                    { transform: 'rotate(-4deg) translateY(-2px)', filter: 'drop-shadow(0 2px 6px ' + theme.primary + '66)', offset: 0.25 },
                    { transform: 'rotate(4deg) translateY(-3px)', filter: 'drop-shadow(0 4px 10px ' + theme.primary + '99)', offset: 0.5 },
                    { transform: 'rotate(-2deg) translateY(-1px)', filter: 'drop-shadow(0 2px 4px ' + theme.primary + '4D)', offset: 0.75 },
                    { transform: 'rotate(0deg) translateY(0)', filter: 'drop-shadow(0 0 0px transparent)' }
                ], { duration: 2500, iterations: Infinity, easing: 'ease-in-out' });
            };
        }
    } else {
        // 恢复正常
        fabMain.classList.add('fab-pulse');
        fabMainIcon.getAnimations().forEach(a => a.cancel());
        if (fabSmall) { fabSmall.style.opacity = ''; fabSmall.style.pointerEvents = ''; }
        if (fabGear) { fabGear.style.opacity = ''; fabGear.style.pointerEvents = ''; }
        fabMain.style.background = theme.primary;
        fabMain.style.boxShadow = '';
        fabMainIcon.style.color = '';
        fabMainIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>';
        fabMainIcon.setAttribute('stroke', 'currentColor');
        fabMainIcon.setAttribute('fill', 'none');
        fabMainIcon.classList.remove('fab-icon-spin');
        if (!fabCheckActive) {
            void fabMainIcon.offsetWidth;
            fabMainIcon.classList.add('fab-icon-spin');
        }
    }

    // 更新状态记录
    fabState = newState;
}

function updateBatchDeleteBar() {
    const topBar = document.getElementById('batchSelectAllBar');
    if (!topBar) return;
    // 全选栏显示/隐藏
    topBar.classList.remove('hidden');
    document.getElementById('batchSelectInfo').textContent = `已选择 ${batchSelectedIds.size} 项`;
    // 更新全选按钮文字
    const selectAllBtn = document.getElementById('selectAllBtn');
    if (batchSelectedIds.size === items.length && items.length > 0) {
        selectAllBtn.textContent = '取消全选';
    } else {
        selectAllBtn.textContent = '全选';
    }
}

function showBatchDeleteConfirm() {
    if (batchSelectedIds.size === 0) { showToast('请先选择要删除的灵感'); return; }
    document.getElementById('batchDeleteDesc').textContent = `确定删除选中的 ${batchSelectedIds.size} 条灵感？删除后将无法恢复。`;
    document.getElementById('batchDeleteModal').classList.remove('hidden');
}
function closeBatchDeleteModal() { document.getElementById('batchDeleteModal').classList.add('hidden'); }

function confirmBatchDelete() {
    const count = batchSelectedIds.size;
    if (count === 0) { showToast('请先选择要删除的灵感'); return; }
    // 移入回收站
    batchSelectedIds.forEach(id => {
        const item = items.find(i => i.id === id);
        if (item) moveToRecycleBin(item);
    });
    items = items.filter(i => !batchSelectedIds.has(i.id));
    saveItems();
    // 先退出批量模式（跳过变形动画，直接恢复加号）
    batchDeleteMode = false;
    batchSelectedIds = new Set();
    document.getElementById('batchSelectAllBar').classList.add('hidden');
    updateFabState();
    renderFeed();
    // 再显示✅
    showFabCheckmark();
    showToast(`已删除 ${count} 项灵感 可在回收站恢复`);
    checkUncategorizedEmpty();
}

function addDemoData() {
    const now = Date.now();
    const day = 24 * 3600000;
    const startDate = new Date('2026-01-01').getTime();
    const totalDays = Math.floor((now - startDate) / day);

    // 确保 8 个分类存在
    const newCategories = [
        { name: '认知', emoji: '🧠' },
        { name: '收藏', emoji: '⭐' },
        { name: '效率', emoji: '⚡' },
        { name: '待办事项', emoji: '✅' },
        { name: '个人计划', emoji: '📋' },
        { name: '阅读', emoji: '📖' },
        { name: '灵感', emoji: '💡' },
        { name: '健康', emoji: '💪' }
    ];
    newCategories.forEach(cat => {
        if (!tags.find(t => t.name === cat.name)) {
            tags.push({ id: 'tag_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6), name: cat.name, emoji: cat.emoji, editable: true, deletable: true });
        }
    });
    saveTags();

    // 添加示例笔记簿
    if (!notebooks.find(n => n.name === '工作备忘')) {
        notebooks.push({ id: 'nb_work_' + Date.now(), name: '工作备忘', createdAt: new Date().toISOString() });
    }
    if (!notebooks.find(n => n.name === '生活随笔')) {
        notebooks.push({ id: 'nb_life_' + Date.now(), name: '生活随笔', createdAt: new Date().toISOString() });
    }
    saveNotebooks();

    const demoContents = [
        // === 无图灵感 ===
        { title: '✅ 本周待办清单', content: '### 📌 紧急重要\n- [x] 完成项目需求评审\n- [x] 提交周报给团队负责人\n- [ ] 更新个人作品集\n- [ ] 预约年度体检\n\n### 📋 常规事项\n- [ ] 整理书架和桌面\n- [ ] 学习 Tailwind CSS 新特性\n- [ ] 回复 3 封待处理邮件\n- [ ] 准备周五分享会 PPT\n\n### 📖 阅读\n- [ ] 读完《原子习惯》第 5-8 章\n- [ ] 整理读书笔记\n\n> 💡 **提示**：先完成紧急重要的事，再处理常规事项', type: '待办事项' },
        { title: '⚡ 会议效率提升技巧', content: '### 会前准备\n- **提前 24 小时**发送议程\n- 明确会议目标和预期产出\n- 参会者提前阅读相关材料\n\n### 会中执行\n- **站立会议控制在 15 分钟内**\n- 每人只说三件事：完成了什么、计划做什么、遇到什么阻碍\n- 指定专人记录行动项\n\n### 会后跟进\n- **24 小时内**发送会议纪要\n- 每个行动项明确负责人和截止日期\n- 取消没有明确目标的会议\n\n> 一场没有行动项的会议，本质上是一封可以写成邮件的通知。', type: '效率' },
        { title: '🧠 认知偏差：确认偏误', content: '### 🧩 什么是确认偏误？\n\n> 人们倾向于寻找**支持自己观点**的证据，忽视反面信息。\n\n### 📊 典型表现\n\n- 只看赞同自己立场的新闻\n- 评估证据时双重标准\n- 记住支持观点的案例，忘记反对的\n\n### 🛡️ 应对方法\n\n1. **主动寻找反面证据** — 刻意搜索反对观点\n2. **设立「魔鬼代言人」** — 找人挑战你的想法\n3. **写下预判** — 在看到数据前先写下预期\n4. **多元化信息源** — 关注不同立场的媒体\n\n### 💡 延伸阅读\n\n- 《思考，快与慢》— 丹尼尔·卡尼曼\n- 《事实》— 汉斯·罗斯林', type: '认知' },
        { title: '📖 《原子习惯》核心摘要', content: '### 🔄 习惯养成的四定律\n\n1. **提示** — 让好习惯显而易见\n2. **渴求** — 让好习惯有吸引力\n3. **反应** — 让好习惯简便易行\n4. **奖励** — 让好习惯令人愉悦\n\n### 🛠️ 实操方法\n\n- **习惯堆叠**：在已有习惯后追加新习惯\n  - 「刷完牙后，立刻做 10 个深蹲」\n- **两分钟法则**：新习惯缩到 2 分钟内可完成\n  - 「阅读 1 页」比「每天读 1 小时」更容易开始\n- **环境设计**：改变环境比改变意志力更有效\n  - 把手机放到另一个房间\n\n> 你不会达到目标的高度，你只会落到系统的水平。', type: '阅读' },
        { title: '💡 语音输入转笔记的交互设计', content: '### 🎙️ 核心功能\n\n- **实时语音识别** + 自动标点\n- **语义分段**：自动识别话题切换\n- **多语言支持**：中英文无缝切换\n\n### 🗣️ 语音指令\n\n- 「**新建一条灵感**」→ 创建空白笔记\n- 「**标记为待办**」→ 添加待办标签\n- 「**设为重要**」→ 置顶显示\n\n### 📡 离线与同步\n\n- 离线模式下先**本地缓存**\n- 联网后**自动同步**到云端\n- 冲突时保留两个版本供用户选择\n\n### 🎯 适用场景\n\n- 开车时的灵感记录\n- 做饭时的待办添加\n- 走路时的读书笔记', type: '灵感' },
        { title: '🧠 决策疲劳与简化策略', content: '### 🧠 核心原理\n\n> 每天做决策的次数有限。重要决策应该放在**精力最充沛的上午**。\n\n### 🔄 建立默认选项\n\n通过减少日常小决策来**保护决策能量**：\n\n- **早餐**：固定 2-3 个选项轮换\n- **穿搭**：提前一晚准备好\n- **日程**：预设每日模板，填入具体任务\n\n### 📋 决策分级\n\n- **A级**（重要）：上午处理，充分思考\n- **B级**（常规）：下午处理，快速决定\n- **C级**（琐碎）：批量处理或委托\n\n### ✅ 本周实践\n\n- [ ] 固定每日早餐菜单\n- [ ] 提前准备一周穿搭\n- [ ] 将 3 个 B 级决策委托出去\n- [x] 列出所有重复性决策清单\n- [x] 为早餐选定 3 个固定选项', type: '认知' },
        { title: '⚡ 番茄工作法的进阶用法', content: '### ⏱️ 按任务类型调整节奏\n\n- **深度工作**：50 分钟专注 + 10 分钟休息\n  - 适合：编码、写作、设计\n- **浅层事务**：15 分钟专注 + 5 分钟休息\n  - 适合：回邮件、整理文档、沟通协调\n- **创意发散**：25 分钟专注 + 5 分钟休息\n  - 适合：头脑风暴、方案构思\n\n### 📝 关键原则\n- 每个番茄钟**只做一件事**\n- 中断时记录原因，持续优化环境\n- 每天目标：4-6 个深度番茄钟\n\n> 不是所有工作都值得用番茄钟。机械性任务直接做完，别拖延。', type: '效率' },
        { title: '📋 年度技能学习路线图', content: '### Q1：前端工程化\n- Webpack / Vite 构建原理\n- Monorepo 管理（Turborepo / Nx）\n- CI/CD 自动化部署\n\n### Q2：后端基础\n- Node.js + Express / Koa\n- 数据库设计（MySQL + Redis）\n- RESTful API 规范\n\n### Q3：移动端开发\n- Flutter / React Native 选型对比\n- 跨端状态管理方案\n- 性能优化与原生桥接\n\n### Q4：AI 应用开发\n- LLM API 集成（OpenAI / Claude）\n- Prompt Engineering 技巧\n- RAG 检索增强生成实践\n\n> 每季度输出 **1 个完整项目**作为学习成果。', type: '个人计划' },
        { title: '✅ 月末财务复盘清单', content: '### 📊 收支核对\n- [x] 核对信用卡账单\n- [x] 统计各分类支出\n- [ ] 检查订阅服务是否仍在使用\n- [ ] 更新下月预算\n- [ ] 对比实际支出与预算差异\n\n### 💰 异项记录\n- [ ] 记录一笔意外收入或支出\n- [ ] 确认工资到账金额\n- [x] 确认社保公积金缴纳正常\n\n### 📈 投资检查\n- [ ] 检查基金定投是否正常扣款\n- [ ] 评估是否需要调仓\n\n> 连续 3 个月餐饮支出超标，下月需要控制外卖频率', type: '待办事项' },
        { title: '🧠 信息筛选的核心原则', content: '### 🎯 三大筛选标准\n\n1. **相关性** — 与我的目标是否相关？\n2. **可行动性** — 读完后我能做什么？\n3. **时效性** — 这个信息现在有用吗？\n\n### 📥 输入管理\n\n- [ ] 每天花 **5 分钟**审视信息输入源\n- [ ] 取消关注低价值账号\n- [ ] 关闭不必要的 App 推送通知\n- [ ] 设定固定浏览时间（而非随时刷）\n- [x] 已整理 RSS 订阅源列表\n\n### 📤 输出导向\n\n- 信息只有经过**加工处理**才有价值\n- 读到好内容 → 用自己的话**复述**一遍\n- 用 Gator 记录**行动要点**，而非原文摘抄\n\n> **不是所有信息都值得消耗注意力。** 你的注意力是你最宝贵的资产。', type: '认知' },

        // === 单图灵感 ===
        { title: '📖 《深度工作》读书笔记', content: '![](https://picsum.photos/id/1025/1200/800)\n\n### 📌 核心观点\n\n> 深度工作能力日益稀缺，因此日益珍贵。\n\n在注意力经济时代，能够持续专注进行高认知难度工作的人，将成为赢家。\n\n### 🔑 关键策略\n\n1. **设定固定深度工作时段** — 每天至少 2 小时不受打扰\n2. **建立仪式感** — 固定地点、固定时间、固定流程\n3. **远离社交媒体** — 限制碎片化信息输入\n4. **拥抱无聊** — 训练大脑在无刺激时保持专注\n\n### 💡 个人行动\n- [ ] 每天上午 9-11 点为深度工作时间\n- [ ] 关闭所有通知推送\n- [x] 已删除 3 个不常用的社交 App\n- [ ] 每周做一次深度工作时长统计\n- [x] 购买降噪耳机', type: '阅读' },
        { title: '💪 久坐族的简单运动方案', content: '![](https://picsum.photos/id/1043/1200/800)\n\n### 🏢 办公室 5 分钟\n\n- **坐姿转体** — 双手轻抱头，向两侧转体\n- **肩部环绕** — 双肩向后画大圆 10 次\n- **桌面拉伸** — 双手十指相扣向前推\n- **脚踝环绕** — 双脚各顺时针逆时针 10 次\n\n### 🛋️ 居家 15 分钟\n\n1. **墙壁天使** 2 组 × 15 次\n2. **靠墙静蹲** 30 秒 × 3 组\n3. **猫牛式** 10 次\n4. **臀桥** 3 组 × 15 次\n5. **婴儿式放松** 1 分钟\n\n### ⚠️ 重要提醒\n\n> 每坐 1 小时，起身活动 5 分钟。久坐 = 新吸烟。', type: '健康' },
        { title: '⭐ 高效命令行工具合集', content: '![](https://picsum.photos/id/0/1200/800)\n\n### 🔍 搜索与查找\n\n- **fzf** — 模糊查找神器，配合任何命令使用\n- **ripgrep (rg)** — 极速文本搜索，替代 grep\n- **fd** — 更友好的 find 替代，语法简洁\n\n### 📄 文件查看\n\n- **bat** — 带**语法高亮**和行号的 cat\n- **exa / eza** — 现代化的 ls，支持图标和 Git 状态\n- **delta** — 更好的 diff 显示\n\n### ⚡ 效率提升\n\n- **zoxide** — 智能目录跳转，记住常用路径\n- **tmux** — 终端复用，一个窗口多个会话\n\n> 工具不在多，在于**熟练使用**。先掌握 3 个，再逐步扩展。', type: '收藏' },
        { title: '✈️ 日本京都赏樱行程', content: '![](https://picsum.photos/id/1039/1200/800)\n\n### 🗓️ 最佳赏樱时间\n\n- **3月底至4月初** — 京都樱花盛开期\n- **清晨 6-8 点** — 人少光好，适合拍照\n- **傍晚黄昏** — 夜樱点灯别有风情\n\n### 🌸 推荐路线\n\n1. **哲学之道** — 2公里樱花小径\n2. **岚山** — 山樱配竹林\n3. **清水寺** — 夜樱点灯必看\n4. **平安神宫** — 红桥配樱花\n\n### 📸 拍照小贴士\n\n- 穿素雅色系衣服（米白、浅粉、淡蓝）\n- 带广角镜头拍全景\n- 利用前景（垂枝樱）营造层次感\n\n> 京都的樱花，是春天写给日本的情书。', type: '灵感' },
        { title: '☕ 我的手冲咖啡器具清单', content: '![](https://picsum.photos/id/225/1200/800)\n\n### 🎯 基础必备（入门级）\n\n- **V60 锥形滤杯** — 通用性最强\n- **手冲壶** — 细长壶嘴控制水流\n- **电子秤** — 精确到 0.1g\n- **温度计** — 88-93°C 最佳区间\n\n### ⚙️ 进阶装备\n\n- **锥形磨豆机** — 均匀度远胜刀盘\n- **咖啡测厚仪** — 科学萃取\n- **意式咖啡机** — 如果追求浓缩\n\n### ☕ 推荐咖啡豆\n\n- **埃塞俄比亚 耶加雪菲** — 花果香，适合新手\n- **哥伦比亚 蕙兰** — 平衡顺滑\n- **肯尼亚 AA** — 明亮果酸，进阶挑战\n\n### 💡 黄金比例\n\n> **1:15** — 15g 咖啡豆配 225g 水，2分钟萃取完成。', type: '灵感' },

        // === 多图灵感 ===
        { title: '🍜 曼谷夜市美食地图', content: '![](https://picsum.photos/id/1080/1200/800)\n![](https://picsum.photos/id/292/1200/800)\n\n### 🌙 夜市推荐 Top 5\n\n1. **Yaowarat 唐人街** — 街头小吃天堂\n2. **Jodd Fairs** — 网红集市，年轻人最爱\n3. **Chatuchak 周末市场** — 亚洲最大露天市集\n4. **Asiatique 河滨夜市** — 湄南河边浪漫选择\n5. **IconSiam 室内夜市** — 空调友好，适合白天\n\n### 🍜 必吃清单\n\n- **冬阴功汤** — 酸辣开胃\n- **芒果糯米饭** — 国民甜品\n- **青木瓜沙拉** — 越辣越爽\n- **泰式炒河粉（Pad Thai）** — 经典之选\n\n### 💡 实用 Tips\n\n- 带现金，很多小摊位不刷卡\n- 准备小面额找零\n- 避开 7-9 点高峰期\n\n> 在曼谷夜市，用 100 泰铢就能买到满满的幸福感。', type: '灵感' },
        { title: '🎨 极简主义室内设计灵感', content: '![](https://picsum.photos/id/1048/1200/800)\n![](https://picsum.photos/id/1055/1200/800)\n![](https://picsum.photos/id/1067/1200/800)\n\n### 🌿 核心原则\n\n- **少即是多** — 每件物品都值得存在\n- **留白** — 给空间呼吸的余地\n- **功能性优先** — 形式追随功能\n\n### 🎨 色彩方案\n\n- **黑白灰基底** — 永远不会出错\n- **木色点缀** — 增添温度\n- **一抹绿植** — 生机之笔\n\n### ✨ 装饰要点\n\n- 选择 **1-2 件** 有故事的家具作为焦点\n- 收纳隐藏在视线外，保持表面整洁\n- 灯光用 **暖色调 3000K** 营造氛围\n\n> 极简不是空无一物，而是让每一件物品都恰到好处。', type: '灵感' },
        { title: '🌿 北欧风阳台绿植布置', content: '![](https://picsum.photos/id/110/1200/800)\n![](https://picsum.photos/id/164/1200/800)\n\n### 🪴 适合北欧风的植物\n\n- **琴叶榕** — 大叶片，视觉焦点\n- **龟背竹** — 独特的叶片造型\n- **橄榄树** — 地中海气息\n- **尤加利** — 银灰叶片百搭\n\n### 🏺 花盆选择\n\n- **赤陶土色** — 自然温暖\n- **白色陶瓷** — 清新简约\n- **水泥质感** — 工业北欧风\n- **藤编花篮** — 增添层次\n\n### ☀️ 养护要点\n\n- **光照** — 北欧植物大多喜光\n- **浇水** — 表土干透再浇\n- **通风** — 定期开窗换气\n- **湿度** — 喷雾器保持湿度\n\n> 阳台是家与自然的对话窗口。', type: '灵感' },
        { title: '📱 移动端设计趋势 2026', content: '![](https://picsum.photos/id/1059/1200/800)\n![](https://picsum.photos/id/1060/1200/800)\n![](https://picsum.photos/id/1062/1200/800)\n![](https://picsum.photos/id/1064/1200/800)\n\n### 🌟 五大趋势\n\n1. **Glassmorphism 2.0** — 更克制的毛玻璃效果\n2. **AI 驱动的个性化界面** — 根据用户行为动态调整\n3. **深色模式原生支持** — 不再是附加功能\n4. **微交互（Micro-interactions）** — 细节决定体验\n5. **大留白+大字号** — 信息密度降低，阅读体验提升\n\n### 🎯 设计要点\n\n- **触摸目标 ≥ 48x48pt** — 符合 WCAG 标准\n- **动效时长 200-400ms** — 感觉流畅不拖沓\n- **色彩对比度 ≥ 4.5:1** — 保证可读性\n\n### 💡 工具推荐\n\n- **Figma** + **Framer** — 原型与设计\n- **LottieFiles** — 动画素材\n- **Unsplash API** — 高质量图片资源\n\n> 好的移动设计应该像氧气——无处不在但从不打扰。', type: '灵感' },
        { title: '💪 睡眠质量优化清单', content: '![](https://picsum.photos/id/1035/1200/800)\n![](https://picsum.photos/id/1036/1200/800)\n\n### 🌙 睡前 1 小时\n\n- [ ] 关闭所有**蓝光设备**（手机、电脑）\n- [ ] 调暗室内灯光\n- [ ] 避免大量进食和饮酒\n- [x] 已设置手机自动勿扰模式\n\n### 🛏️ 卧室环境\n\n- 温度保持在 **18-22°C**\n- 使用**遮光窗帘**\n- 保持安静（或使用白噪音）\n\n### 📋 睡前仪式\n\n- [ ] 热水澡或泡脚 15 分钟\n- [ ] 阅读 10 分钟（纸质书）\n- [ ] 5 分钟冥想或深呼吸\n- [ ] 写下明天的 3 件重要事项\n- [x] 已购买遮光窗帘\n\n### ⚠️ 避免\n\n- 下午 2 点后不喝咖啡\n- 不在床上看手机或工作\n\n> 睡眠是**最被低估的生产力工具**。投资睡眠 = 投资效率。', type: '健康' },
    ];

    const demos = demoContents.map((d, i) => {
        const offsetDays = Math.floor((i / demoContents.length) * totalDays);
        const offsetHours = Math.floor(Math.random() * 24);
        const createdAt = new Date(startDate + offsetDays * day + offsetHours * 3600000).toISOString();
        return {
            id: 'item_' + (Date.now() + i),
            title: d.title,
            content: d.content,
            type: d.type,
            createdAt,
            updatedAt: createdAt,
            pinned: false
        };
    });

    items = [...demos, ...items];
    saveItems(); renderFeed(); renderTabBar(); renderTagManageList(); showFabCheckmark(); showToast('示例笔记簿与灵感已添加');
}

function showToast(msg) {
    const t = document.getElementById('toast');
    const theme = THEMES[currentTheme] || THEMES.blue;
    t.textContent = msg; t.style.background = theme.primary;
    t.classList.remove('opacity-0'); t.classList.add('opacity-100');
    setTimeout(() => { t.classList.remove('opacity-100'); t.classList.add('opacity-0'); }, 2000);
}

// ===== 灵感阅读模式 =====
// 从 localStorage 读取上次保存的阅读模式状态
let fullscreenReading = localStorage.getItem('gator_fullscreen_reading') === 'true';
let readingMode = localStorage.getItem('gator_reading_mode') || 'note'; // 'normal' 或 'note'，默认选中 Note 模式

function openInspirationReadingMode() {
    closeGearMenu();
    updateReadingModeUI();
    updateFullscreenReadingSwitchUI();
    document.getElementById('inspirationReadingModal').classList.remove('hidden');
}

function closeInspirationReadingMode() {
    document.getElementById('inspirationReadingModal').classList.add('hidden');
    showFabCheckmark();
}

function selectReadingMode(mode) {
    readingMode = mode;
    localStorage.setItem('gator_reading_mode', mode);
    updateReadingModeUI();
    closeInspirationReadingMode();
}

function updateReadingModeUI() {
    const normalBtn = document.getElementById('normalModeBtn');
    const noteBtn = document.getElementById('noteModeBtn');
    if (!normalBtn || !noteBtn) return;

    // 清除所有旧状态
    normalBtn.classList.remove('active', 'normal-active');
    noteBtn.classList.remove('active', 'note-active');

    // 按 readingMode 设置新状态（normal-active / note-active）
    if (readingMode === 'normal') {
        normalBtn.classList.add('active', 'normal-active');
    } else if (readingMode === 'note') {
        noteBtn.classList.add('active', 'note-active');
    }
}

function toggleFullscreenReading() {
    fullscreenReading = !fullscreenReading;
    localStorage.setItem('gator_fullscreen_reading', fullscreenReading.toString());
    localStorage.setItem('gator_fullscreen_reading', fullscreenReading);
    updateFullscreenReadingSwitchUI();
}

function updateFullscreenReadingSwitchUI() {
    const sw = document.getElementById('fullscreenReadingSwitch');
    const dot = document.getElementById('fullscreenReadingDot');
    if (!sw || !dot) return;
    if (fullscreenReading) {
        sw.style.background = 'var(--theme-primary, #3B82F6)';
        dot.style.transform = 'translateX(24px)'; // 白点内缩2px，所以移动24px
    } else {
        sw.style.background = '#e5e7eb';
        dot.style.transform = 'translateX(0)';
    }
}

// ===== 数据备份与恢复（导出/导入）=====
// 导出：将用户的灵感、分类、笔记簿、设置打包为 JSON 文件
// 导入：读取 JSON 文件，验证格式后无感应用到当前环境

function exportAllData() {
    const allItemsByNotebook = {};
    notebooks.forEach(nb => {
        try {
            const s = localStorage.getItem(STORAGE_KEY + '_' + nb.id);
            if (s) allItemsByNotebook[nb.id] = JSON.parse(s);
            else allItemsByNotebook[nb.id] = [];
        } catch (e) { allItemsByNotebook[nb.id] = []; }
    });

    const settings = {};
    const settingKeys = [
        'gator_theme', 'gator_custom_color', 'gator_bg_color',
        'gator_layout', 'gator_time_sort', 'gator_show_tag_count',
        'gator_image_preview_mode', 'gator_auto_theme', 'gator_auto_theme_start'
    ];
    settingKeys.forEach(k => {
        const v = localStorage.getItem(k);
        if (v !== null) settings[k] = v;
    });

    const exportData = {
        version: 1,
        exportedAt: new Date().toISOString(),
        app: 'Gator',
        notebooks: notebooks,
        currentNotebookId: currentNotebookId,
        tags: tags,
        itemsByNotebook: allItemsByNotebook,
        settings: settings,
        emojiRecent: (() => {
            try {
                const s = localStorage.getItem(EMOJI_RECENT_KEY);
                return s ? JSON.parse(s) : [];
            } catch (e) { return []; }
        })()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const dateStr = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
    a.href = url;
    a.download = `gator-backup-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    showToast('已导出备份');
    closeGearMenu();
    closeProfileModal();
}

let pendingImportData = null;

function triggerImportFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const data = JSON.parse(evt.target.result);
                if (!data || typeof data !== 'object') throw new Error('格式错误');
                if (!data.notebooks || !Array.isArray(data.notebooks)) throw new Error('缺少笔记簿数据');
                if (!data.itemsByNotebook || typeof data.itemsByNotebook !== 'object') throw new Error('缺少灵感数据');

                let totalItems = 0;
                Object.values(data.itemsByNotebook).forEach(arr => { if (Array.isArray(arr)) totalItems += arr.length; });
                const summary = {
                    version: data.version || 1,
                    exportedAt: data.exportedAt || '未知',
                    notebookCount: data.notebooks.length,
                    totalItems: totalItems,
                    tagCount: Array.isArray(data.tags) ? data.tags.length : 0,
                    fileName: file.name,
                    fileSize: (file.size / 1024).toFixed(1) + ' KB'
                };
                pendingImportData = data;
                showImportConfirmModal(summary);
            } catch (err) {
                showToast('文件格式不正确');
                pendingImportData = null;
            }
        };
        reader.readAsText(file);
    };
    input.click();
    closeGearMenu();
    closeProfileModal();
}

function showImportConfirmModal(summary) {
    const infoEl = document.getElementById('importConfirmInfo');
    if (infoEl) {
        const dateStr = summary.exportedAt !== '未知'
            ? new Date(summary.exportedAt).toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
            : summary.exportedAt;
        infoEl.innerHTML = `
            <div class="space-y-2 text-[13px] text-gray-600">
                <div class="flex justify-between"><span>📦 文件</span><span class="text-gray-900 font-medium">${summary.fileName}（${summary.fileSize}）</span></div>
                <div class="flex justify-between"><span>📅 导出时间</span><span class="text-gray-900 font-medium">${dateStr}</span></div>
                <div class="flex justify-between"><span>📒 笔记簿</span><span class="text-gray-900 font-medium">${summary.notebookCount} 个</span></div>
                <div class="flex justify-between"><span>💡 灵感条目</span><span class="text-gray-900 font-medium">${summary.totalItems} 条</span></div>
                <div class="flex justify-between"><span>🏷️ 分类标签</span><span class="text-gray-900 font-medium">${summary.tagCount} 个</span></div>
            </div>
            <div class="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200">
                <p class="text-[12px] text-amber-700 leading-relaxed">
                    ⚠️ 导入后将<b>覆盖</b>当前所有数据（灵感、分类、笔记簿、设置），操作不可撤销。建议先导出当前数据作为备份。
                </p>
            </div>`;
    }
    document.getElementById('importConfirmModal').classList.remove('hidden');
}

function closeImportConfirmModal() {
    document.getElementById('importConfirmModal').classList.add('hidden');
    pendingImportData = null;
}

function confirmImport() {
    if (!pendingImportData) { closeImportConfirmModal(); return; }
    const data = pendingImportData;

    notebooks = data.notebooks;
    currentNotebookId = data.currentNotebookId || (data.notebooks[0] && data.notebooks[0].id) || 'default';
    saveNotebooks();

    Object.keys(data.itemsByNotebook).forEach(nbId => {
        const key = STORAGE_KEY + '_' + nbId;
        try { localStorage.setItem(key, JSON.stringify(data.itemsByNotebook[nbId])); } catch (e) {}
    });

    if (data.tags && Array.isArray(data.tags)) { tags = data.tags; saveTags(); }
    if (data.settings && typeof data.settings === 'object') {
        Object.keys(data.settings).forEach(k => { localStorage.setItem(k, data.settings[k]); });
    }
    if (data.emojiRecent && Array.isArray(data.emojiRecent)) {
        localStorage.setItem(EMOJI_RECENT_KEY, JSON.stringify(data.emojiRecent));
    }

    loadItems();
    renderFeed();
    updateNotebookNameDisplay();
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme && THEMES[savedTheme]) { currentTheme = savedTheme; applyTheme(savedTheme); }
    const savedLayout = localStorage.getItem(LAYOUT_KEY);
    if (savedLayout) {
        currentLayout = savedLayout;
        const btn = document.getElementById('layoutToggleBtn');
        if (btn && savedLayout === 'masonry') btn.classList.add('layout-active');
        else if (btn) btn.classList.remove('layout-active');
    }
    closeImportConfirmModal();
    showToast('恢复成功');
    showFabCheckmark();
}

function toggleProfileModal() {
    const m = document.getElementById('profileModal');
    if (m.classList.contains('hidden')) {
        const info = document.getElementById('profileInfo');
        if (info) {
            let totalItems = 0;
            notebooks.forEach(nb => {
                try {
                    const s = localStorage.getItem(STORAGE_KEY + '_' + nb.id);
                    if (s) totalItems += JSON.parse(s).length;
                } catch (e) {}
            });
            info.innerHTML = `
                <div class="space-y-2 text-[13px] text-gray-600">
                    <div class="flex justify-between"><span>📒 笔记簿</span><span class="text-gray-900 font-medium">${notebooks.length} 个</span></div>
                    <div class="flex justify-between"><span>💡 灵感总数</span><span class="text-gray-900 font-medium">${totalItems} 条</span></div>
                    <div class="flex justify-between"><span>🏷️ 分类</span><span class="text-gray-900 font-medium">${tags.length} 个</span></div>
                </div>`;
        }
        m.classList.remove('hidden');
    } else { closeProfileModal(); }
}
function closeProfileModal() {
    document.getElementById('profileModal').classList.add('hidden');
    showFabCheckmark();
}

function closeEditOverlay() {
    const overlay = document.getElementById('editOverlay');
    if (overlay) overlay.classList.add('hidden');
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeEditOverlay();
        closeFullscreenEditor();
        closeInputModal(); closeBgColorModal(); closeDeleteModal(); closeDeleteNotebookModal();
        closeCreateNotebookModal(); closeRenameNotebookModal(); closeNotebookMenu(); closeDetailModal();
        closeNoteFullscreenModal();
        closeImageFullscreenModal();
        closeTagManage(); closeEmojiPicker(); closeGearMenu(); closeInspirationManage();
        closeInspirationReadingMode();
        closeRecycleBin(); closeBatchDeleteModal(); closeTagGearMenu(); closeClearAllModal(); closeClearRecycleBinModal(); closeRestoreAllModal(); closeDeleteTagModal();
        closeProfileModal(); closeImportConfirmModal();
        closeExportInspiration(); closeImportInspiration(); closeAutoExportSettings();
        if (batchDeleteMode) exitBatchDeleteMode();
    }
});

// ===== 导出灵感：入口与格式选择 =====
function openExportInspiration() {
    document.getElementById('exportInspirationModal').classList.remove('hidden');
}
function closeExportInspiration() {
    document.getElementById('exportInspirationModal').classList.add('hidden');
}
function toggleExportDocOptions() {
    const box = document.getElementById('exportDocOptions');
    const chevron = document.getElementById('exportDocChevron');
    if (box.classList.contains('hidden')) {
        box.classList.remove('hidden');
        if (chevron) chevron.style.transform = 'rotate(90deg)';
    } else {
        box.classList.add('hidden');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
}
function handleExportFormat(format) {
    // 导出入口占位：具体的导出逻辑（PDF/Markdown/Pages/Word/飞书云文档/长图/JSON）后续版本接入
    const map = {
        json: 'JSON 文件',
        image: '长图',
        pdf: 'PDF 文档',
        markdown: 'Markdown 文档',
        pages: 'Pages 文档',
        word: 'Word 文档',
        feishu: '飞书云文档'
    };
    if (format === 'json') {
        // JSON 导出沿用已有逻辑
        exportAllData();
        closeExportInspiration();
        return;
    }
    alert('「导出为' + (map[format] || format) + '」功能入口已预留，具体导出逻辑将在后续版本接入。');
}

// ===== 导入灵感：文本 + 文件 =====
function openImportInspiration() {
    document.getElementById('importInspirationModal').classList.remove('hidden');
    const textarea = document.getElementById('importTextInput');
    if (textarea) textarea.value = '';
    const preview = document.getElementById('importTextPreview');
    if (preview) { preview.classList.add('hidden'); preview.textContent = ''; }
}
function closeImportInspiration() {
    document.getElementById('importInspirationModal').classList.add('hidden');
}
function handleImportTextChange() {
    const textarea = document.getElementById('importTextInput');
    const preview = document.getElementById('importTextPreview');
    if (!textarea || !preview) return;
    const text = (textarea.value || '').trim();
    if (!text) {
        preview.classList.add('hidden');
        preview.textContent = '';
        return;
    }
    // 尝试判断是否为 JSON
    const looksLikeJSON = /^\s*[\{\[]/.test(text);
    if (looksLikeJSON) {
        preview.classList.remove('hidden');
        preview.textContent = '已识别为 JSON 数据，导入时将按 JSON 解析。';
    } else {
        const lines = text.split(/\n+/).filter(Boolean).length;
        preview.classList.remove('hidden');
        preview.textContent = '已识别为文本内容，将按 ' + lines + ' 条灵感导入。';
    }
}
function submitImportText() {
    const textarea = document.getElementById('importTextInput');
    const text = (textarea ? textarea.value : '').trim();
    if (!text) {
        alert('请先粘贴灵感内容或 JSON 数据。');
        return;
    }
    // 文本导入占位：具体解析/入库逻辑后续版本接入
    const looksLikeJSON = /^\s*[\{\[]/.test(text);
    if (looksLikeJSON) {
        alert('从文本导入（JSON）入口已预留，具体解析逻辑将在后续版本接入。');
    } else {
        const lines = text.split(/\n+/).filter(Boolean).length;
        alert('从文本导入（' + lines + ' 条灵感）入口已预留，具体导入逻辑将在后续版本接入。');
    }
    closeImportInspiration();
}

// ===== 自动导出设置 =====
function openAutoExportSettings() {
    document.getElementById('autoExportSettingsModal').classList.remove('hidden');
}
function closeAutoExportSettings() {
    document.getElementById('autoExportSettingsModal').classList.add('hidden');
}
function toggleAutoExport(swEl) {
    const dot = swEl.querySelector('div');
    if (swEl.style.background && swEl.style.background !== 'rgb(229, 231, 235)' && swEl.style.background !== '#e5e7eb') {
        swEl.style.background = '#e5e7eb';
        if (dot) dot.style.transform = 'translateX(0)';
    } else {
        swEl.style.background = '#3b82f6';
        if (dot) dot.style.transform = 'translateX(20px)';
    }
}
function selectAutoExportFreq() {
    // 占位：频率选择弹窗（每日 / 每周 / 每月）
    alert('自动导出频率选择功能入口已预留。');
}
function selectAutoExportFormats() {
    // 占位：格式多选弹窗
    alert('自动导出格式多选入口已预留。');
}

// 页面加载后初始化UI状态
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updateReadingModeUI, 100);
    setTimeout(updateFullscreenReadingSwitchUI, 100);
});
