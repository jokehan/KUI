//需要进行初始化操作的UI样式名称
var KUI_INIT_CLASSES = ['label.checkbox','kui-topnav','kui-sidenav','kui-table','kui-table-box'];

//UI样式名称对应的初始化操作器
var KUI_CLASS_INIT_HANDLERS = {
	'label.checkbox' : initClassKuiLabelCheckbox,
	'kui-topnav' : initClassKuiTopnav,
	'kui-sidenav' : initClassKuiSidenav,
	'kui-table' : initClassKuiTable,
	'kui-table-box' : initClassKuiTableBox
};

//UI对象对应的系统生成data-bind值计数器
var KUI_OBJ_SYSBIND_COUNTER = {
	'label.checkbox' : 0
};

//UI对象查找表，由id查找表和data-bind查找表组成
var KUI_OBJ_LOOKUP = {id:{}, bind:{}};

//根据id或data-bind查找UI对象，先查id再查data-bind
function kui(value) {
	if(typeof(value) != 'string') {
		return null;
	}

	var obj = KUI_OBJ_LOOKUP.id[value];
	if(!obj) {
		obj = KUI_OBJ_LOOKUP.bind[value];
	}

	return typeof(obj) == 'undefined' ? null : obj;
}

//事件上下文对象
function EventContext() {
	var _this = this;

	var _eventListenerLookup = {};
	var _objEventBinds = {};

	//注册事件监听器
	this.register = function(event, listener, obj) {
		if(event && typeof(listener) == 'function') {
			var list = _eventListenerLookup[event];
			if(list) {
				list.push(listener);
			}else {
				list = [listener];
				_eventListenerLookup[event] = list;
			}
			if(obj && typeof(obj) == 'object') {
				list = _objEventBinds[obj];
				if(list) {
					list.push([event, listener]);
				}else {
					list = [[event, listener]];
					_objEventBinds[obj] = list;
				}
			}
		}
	};

	//注销事件监听器
	this.unregister = function(event, listener) {
		if(event && typeof(listener) == 'function') {
			var list = _eventListenerLookup[event];
			if(list && list.length > 0) {
				for(var i = list.length - 1; i >= 0; i--) {
					if(listener == list[i]) {
						list.splice(i, 1);
					}
				}
			}
		}
	};

	//注销指定对象上的所有事件监听器
	this.unbind = function(obj) {
		if(obj) {
			var list = _objEventBinds[obj];
			if(list && list.length > 0) {
				for(var i = 0; i < list.length; i++) {
					_this.unregister(list[i][0], list[i][1]);
				}
			}
			delete _objEventBinds[obj];
		}
	};

	//广播事件
	this.send = function(event, data) {
		if(event) {
			var list = _eventListenerLookup[event];
			if(list && list.length > 0) {
				for(var i = 0; i < list.length; i++) {
					list[i](data);
				}
			}
		}
	};
}

//普通确认框对象
function KuiConfirm() {
	var _this = this;
	var _inst = $('<div class="kui-confirm"><div><div><div><section><h2></h2><div></div></section><footer><div><button class="primary"></button><button class="light"></button></div></footer></div></div></div></div>');

	$(document.body).append(_inst);

	var _box = $($('>div>div>div', _inst)[0]);
	var _title = $($('>div>div>div>section>h2', _inst)[0]);
	var _msg = $($('>div>div>div>section>div', _inst)[0]);
	var _confirmBtn = $($('>div>div>div>footer>div>button:nth-child(1)', _inst)[0]);
	var _cancelBtn = $($('>div>div>div>footer>div>button:nth-child(2)', _inst)[0]);

	var _options = null;

	this.open = function(options) {
		_options = options;
		if(options && typeof(options) == 'object') {
			if(options.title) {
				if(typeof(options.title) == 'function') {
					_title.html(options.title());
				}else {
					_title.html(options.title);
				}
			}
			if(options.msg) {
				if(typeof(options.msg) == 'function') {
					_msg.html(options.msg());
				}else {
					_msg.html(options.msg);
				}
			}
			if(options.btns && typeof(options.btns.length) == 'number') {
				if(options.btns.length > 0) {
					var value = options.btns[0];
					_confirmBtn.html(typeof(value) == value ? ('function' ? value() : value) : '确认');
					if(options.btns.length > 1) {
						value = options.btns[1];
						_cancelBtn.html(typeof(value) == 'function' ? value() : value);
					}else {
						_cancelBtn.text('取消');
					}
				}else {
					_confirmBtn.text('确认');
					_cancelBtn.text('取消');
				}
			}else {
				_confirmBtn.text('确认');
				_cancelBtn.text('取消');
			}
		}
		_inst.fadeIn('fast');
		_box.addClass('show');
	};

	this.close = function(callback) {
		_box.removeClass('show');
		_inst.fadeOut('fast', function() {
			_options = null;
			if(callback) {
				callback(_this);
			}
		});
	};

	this.remove = function() {
		_inst.remove();
	};

	_confirmBtn.click(function() {
		if(_options && typeof(_options) == 'object' && _options.onConfirm && typeof(_options.onConfirm) == 'function') {
			_this.close(_options.onConfirm);
		}else {
			_this.close();
		}
	});

	_cancelBtn.click(function() {
		if(_options && typeof(_options) == 'object' && _options.onCancel && typeof(_options.onCancel) == 'function') {
			_this.close(_options.onCancel);
		}else {
			_this.close();
		}
	});
}

function confirm(title, msg, btns, handler) {
	new KuiConfirm().open({
		title : title,
		msg : msg,
		btns : btns,
		onConfirm : function(self) {
			self.remove();
			if(handler && typeof(handler) == 'function') {
				handler(true);
			}
		},
		onCancel : function(self) {
			self.remove();
			if(handler && typeof(handler) == 'function') {
				handler(false);
			}
		}
	});
}

//警告确认框对象
function KuiWarnConfirm() {
	var _this = this;
	var _inst = $('<div class="kui-confirm-warn"><div><div><div><section><h2></h2><div></div></section><footer><div><button class="danger"></button><button class="light"></button></div></footer></div></div></div></div>');

	$(document.body).append(_inst);

	var _box = $($('>div>div>div', _inst)[0]);
	var _title = $($('>div>div>div>section>h2', _inst)[0]);
	var _msg = $($('>div>div>div>section>div', _inst)[0]);
	var _confirmBtn = $($('>div>div>div>footer>div>button:nth-child(1)', _inst)[0]);
	var _cancelBtn = $($('>div>div>div>footer>div>button:nth-child(2)', _inst)[0]);

	var _options = null;

	this.open = function(options) {
		_options = options;
		if(options && typeof(options) == 'object') {
			if(options.title) {
				if(typeof(options.title) == 'function') {
					_title.html(options.title());
				}else {
					_title.html(options.title);
				}
			}
			if(options.msg) {
				if(typeof(options.msg) == 'function') {
					_msg.html(options.msg());
				}else {
					_msg.html(options.msg);
				}
			}
			if(options.btns && typeof(options.btns.length) == 'number') {
				if(options.btns.length > 0) {
					var value = options.btns[0];
					_confirmBtn.html(typeof(value) == value ? ('function' ? value() : value) : '确认');
					if(options.btns.length > 1) {
						value = options.btns[1];
						_cancelBtn.html(typeof(value) == 'function' ? value() : value);
					}else {
						_cancelBtn.text('取消');
					}
				}else {
					_confirmBtn.text('确认');
					_cancelBtn.text('取消');
				}
			}else {
				_confirmBtn.text('确认');
				_cancelBtn.text('取消');
			}
		}
		_inst.fadeIn('fast');
		_box.addClass('show');
	};

	this.close = function(callback) {
		_box.removeClass('show');
		_inst.fadeOut('fast', function() {
			_options = null;
			if(callback) {
				callback(_this);
			}
		});
	};

	this.remove = function() {
		_inst.remove();
	};

	_confirmBtn.click(function() {
		if(_options && typeof(_options) == 'object' && _options.onConfirm && typeof(_options.onConfirm) == 'function') {
			_this.close(_options.onConfirm);
		}else {
			_this.close();
		}
	});

	_cancelBtn.click(function() {
		if(_options && typeof(_options) == 'object' && _options.onCancel && typeof(_options.onCancel) == 'function') {
			_this.close(_options.onCancel);
		}else {
			_this.close();
		}
	});
}

function warnConfirm(title, msg, btns, handler) {
	new KuiWarnConfirm().open({
		title : title,
		msg : msg,
		btns : btns,
		onConfirm : function(self) {
			self.remove();
			if(handler && typeof(handler) == 'function') {
				handler(true);
			}
		},
		onCancel : function(self) {
			self.remove();
			if(handler && typeof(handler) == 'function') {
				handler(false);
			}
		}
	});
}

//Label下的Checkbox组件对象
function KuiLabelCheckbox(inst) {
	var _this = this;
	var _inst = inst;

	var _checked = false; //是否已选中

	var _options = {
		onChange : null //当选中状态发生改变时的回掉函数
	};

	(function() {
		var bind = _inst.data('bind');
		if(typeof(bind) == 'undefined' || bind == '') {
			_inst.data('bind', 'sys-label-checkbox-' + ++KUI_OBJ_SYSBIND_COUNTER['label.checkbox']);
		}

		if(_inst.hasClass('active')) {
			_checked = true;
		}
	})();

	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};

	this.show = function() {
		_inst.show();
	};

	this.hide = function() {
		_inst.hide();
	};

	//获取当前是否已选中
	this.isChecked = function() {
		return _checked;
	};

	//设置选中状态
	this.setChecked = function(value, src) {
		if(_checked != value) {
			_checked = value;
			if(_checked) {
				_inst.addClass('active');
			}else {
				_inst.removeClass('active');
			}
			if(_options.onChange) {
				_options.onChange(_this, src);
			}
		}
	};

	this.getOptions = function() {
		return _options;
	};

	this.setOptions = function(options) {
		if(typeof(options) == 'object') {
			if(typeof(options.onChange) == 'function') {
				_options.onChange = options.onChange;
			}
		}
	};

	_inst.click(function() {
		if(_checked) {
			_this.setChecked(false, 'user');
		}else {
			_this.setChecked(true, 'user');
		}
	});
}

//顶部导航对象
function KuiTopnav(inst) {
	var _this = this;
	var _inst = inst;

	var _context = {activeMenu:null};

	var _menuList = new KuiTopnavMenuList(_context, $($('>div:nth-child(1)>ul', _inst)[0]));

	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};

	//获得一级菜单数量
	this.getMenuCount = function() {
		return _menuList.getMenuCount();
	};

	//激活指定一级菜单，value可以是索引位、id或data-bind
	this.enabledMenu = function(value) {
		_menuList.enabledMenu(value);
	};
}

//顶部导航菜单列表
function KuiTopnavMenuList(context, inst) {
	var _this = this;
	var _context = context;
	var _inst = inst;

	var _menuItems = [];
	var _menuItemLookup = {id:{}, bind:{}};

	//获得一级菜单数量
	this.getMenuCount = function() {
		return _menuItems.length;
	};

	//激活指定一级菜单，value可以是索引位、id或data-bind
	this.enabledMenu = function(value) {
		if(typeof(value) == 'number') {
			value = parseInt(value);
			if(value >= 0 && value < _menuItems.length) {
				_menuItems[value].enabled();
			}
		}else if(typeof(value) == 'string') {
			var item = _menuItemLookup.id[value];
			if(!item) {
				item = _menuItemLookup.bind[value];
			}

			if(item) {
				item.enabled();
			}
		}
	};

	$('>li', _inst).each(function() {
		var item = new KuiTopnavMenuItem(_context, $(this));
		_menuItems.push(item);

		var id = item.id();
		if(typeof(id) != 'undefined') {
			_menuItemLookup.id[id] = item;
		}

		var bind = item.bind();
		if(typeof(bind) != 'undefined') {
			_menuItemLookup.bind[bind] = item;
		}
	});
}

//顶部导航菜单项
function KuiTopnavMenuItem(context, inst) {
	var _this = this;
	var _context = context;
	var _inst = inst;

	var _link = $($('>a:nth-child(1)', _inst)[0]);
	var _nameInst = $($('>a>span:nth-child(1)', _inst)[0]);

	var _dropdown = null;

	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};

	//获得菜单名称
	this.getName = function() {
		return _nameInst.html();
	};

	//设置菜单名称
	this.setName = function(value) {
		_nameInst.html(value);
	};

	//激活菜单
	this.enabled = function() {
		_link.addClass('active');
	};

	//关闭二级菜单
	this.closeDropdown = function() {
		if(_dropdown) {
			_dropdown.close();
		}
	};

	(function() {
		var list = $('>ul', _inst);
		if(list.length > 0) {
			_dropdown = new KuiTopnavMenuItemDropdown($(list[0]));

			_link.attr('href', 'javascript:;');
			_link.unbind();
			_link.click(function(e) {
				e.stopPropagation();
				if(_dropdown.toggle()) {
					if(_context.activeMenu) {
						_context.activeMenu.closeDropdown();
					}
					_context.activeMenu = _this;
				}else {
					_context.activeMenu = null;
				}
			});

			$(document).click(function() {
				_dropdown.close();
				_context.activeMenu = null;
			});
		}
	})();
}

//顶部导航菜单项二级菜单
function KuiTopnavMenuItemDropdown(inst) {
	var _this = this;
	var _inst = inst;

	var _status = 'close';

	this.open = function() {
		_inst.show();
		_status = 'open';
	};

	this.close = function() {
		_inst.hide();
		_status = 'close';
	};

	this.toggle = function() {
		if(_status == 'close') {
			_this.open();
			return true;
		}else {
			_this.close();
			return false;
		}
	};

	_inst.click(function(e) {
		e.stopPropagation();
	});
}

//侧边导航栏对象
function KuiSidenav(inst) {
	var _this = this;
	var _inst = inst;

	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};

	(function() {
		var index = 0;
		$('>li', _inst).each(function() {
			var menu = new KuiSidenavMenu($(this));
			index++;
		});
	})();
}

//侧边导航栏一级菜单对象
function KuiSidenavMenu(inst) {
	var _this = this;
	var _inst = inst;
	var _link = $(_inst.children().get(0));

	var _dropdown = null;

	(function() {
		var t = _inst.children().get(1);
		if(t) {
			t = $(t);
			if(t.is('ul')) {
				_dropdown = new KuiSidenavMenuDropdown(t);
				_link.attr('href', 'javascript:;');
				_link.click(function() {
					if(_dropdown.toggle()) {
						_link.addClass('open');
					}else {
						_link.removeClass('open');
					}
				});
			}
		}
	})();
}

//侧边导航栏一级菜单下拉框对象
function KuiSidenavMenuDropdown(inst) {
	var _this = this;
	var _inst = inst;

	var _status = 'close';

	(function() {
		var index = 0;
		$('>li', _inst).each(function() {
			var menu = new KuiSidenavMenuDropdownMenu($(this));
			index++;
		});
	})();

	this.toggle = function() {
		if(_status == 'close') {
			_inst.slideDown();
			_status = 'open';
			return true;
		}else {
			_inst.slideUp();
			_status = 'close';
			return false;
		}
	};
}

//侧边导航栏一级菜单下拉框菜单对象
function KuiSidenavMenuDropdownMenu(inst) {
	var _this = this;
	var _inst = inst;
}

//表格对象
function KuiTable(inst) {
	var _this = this;
	var _inst = inst;

	var _options = {
		enabledSortColumn : true, //是否激活排序功能
		sortMultiColumn : false, //是否可以多列同时排序
		onSortColumns : null //点击表头排序时的回掉函数
	};

	(function() {
		var enabledSortColumn = _inst.data('enabledsortcolumn');
		if(typeof(enabledSortColumn) == 'boolean') {
			_options.enabledSortColumn = enabledSortColumn;
		}

		var sortMultiColumn = _inst.data('sortmulticolumn');
		if(typeof(sortMultiColumn) == 'boolean') {
			_options.sortMultiColumn = sortMultiColumn;
		}
	})();

	var _context = {
		options : _options,
		event : new EventContext(),
		table : _this,
		columnCount : 0,
		rowCount : 0,
		selectRows : {
			enabled : false, //是否激活行选择功能
			selectMulti : false, //是否可多选行
			rowFirstColumns : [] //当前已选择的行对象的第一列（即带有checkbox的列）
		}
	};

	var _head = new KuiTableHead(_context, $($('thead', _inst)[0]));
	var _body = new KuiTableBody(_context, $($('tbody', _inst)[0]));

	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};

	this.getOptions = function() {
		return _options;
	};

	this.setOptions = function(options) {
		if(typeof(options) == 'object') {
			if(typeof(options.enabledSortColumn) == 'boolean') {
				_options.enabledSortColumn = options.enabledSortColumn;
			}

			if(typeof(options.sortMultiColumn) == 'boolean') {
				_options.sortMultiColumn = options.sortMultiColumn;
			}

			if(typeof(options.onSortColumns) == 'function') {
				_options.onSortColumns = options.onSortColumns;
			}
		}
	};

	//显示指定列
	this.showColumn = function(index) {
		_head.showColumn(index);
		_body.showColumn(index);
	};

	//隐藏指定列
	this.hideColumn = function(index) {
		_head.hideColumn(index);
		_body.hideColumn(index);
	};

	//激活列排序功能
	this.enabledSortColumn = function() {
		_options.enabledSortColumn = true;
	};

	//禁用列排序功能
	this.disabledSortColumn = function() {
		_options.enabledSortColumn = false;
	};

	//设置表格数据
	this.setData = function(data) {
		_body.setData(data);
	};

	//清空表格数据
	this.clearData = function() {
		_body.clearData();
	};
}

//表格头对象
function KuiTableHead(context, inst) {
	var _this = this;
	var _context = context;
	var _inst = inst;

	_context.head = _this;

	var _headRow = null;
	var _actionRow = null;

	(function() {
		var list = $('tr', _inst);
		_headRow = new KuiTableHeadRow(_context, $(list[0]));
		if(list.length > 1) {
			_actionRow = new KuiTableHeadActionRow(_context, $(list[1]));
		}
	})();

	//显示指定列
	this.showColumn = function(index) {
		_headRow.showColumn(index);
	};

	//隐藏指定列
	this.hideColumn = function(index) {
		_headRow.hideColumn(index);
	};

	this.update = function() {
		if(_actionRow) {
			if(_context.selectRows.rowFirstColumns.length == 0) {
				_actionRow.hide();
				_headRow.show();
			}else {
				_headRow.hide();
				_actionRow.show();
			}
		}
	};

	_context.event.register('row.select', _this.update);
	_context.event.register('rows.select.all', _this.update);

	_context.event.register('row.unselect', _this.update);
	_context.event.register('rows.unselect.all', _this.update);
}

//表格头行对象
function KuiTableHeadRow(context, inst) {
	var _this = this;
	var _context = context;
	var _inst = inst;

	this.show = function() {
		_inst.show();
	};

	this.hide = function() {
		_inst.hide();
	};

	var _columns = [];

	(function() {
		var index = 0;
		$('th', _inst).each(function() {
			var col = new KuiTableHeadColumn(_context, _this, index, $(this));
			_columns.push(col);
			index++;
		});
	})();

	_context.columnCount = _columns.length;

	//显示指定列
	this.showColumn = function(index) {
		if(index >= 0 && index < _columns.length) {
			_columns[index].show();
		}
	};

	//隐藏指定列
	this.hideColumn = function(index) {
		if(index >= 0 && index < _columns.length) {
			_columns[index].hide();
		}
	};

	var _sortColumns = [];

	this.addSortColumn = function(column) {
		if(column.getCaseType() == 1) {
			if(_context.options.sortMultiColumn) {
				_sortColumns.push(column);
			}else {
				for(var i = 0; i < _sortColumns.length; i++) {
					_sortColumns[i].cancelSort(false);
				}
				_sortColumns = [column];
			}
			_this.notifySortColumns();
		}
	};

	this.updateSortColumn = function(column) {
		if(column.getCaseType() == 1) {
			_this.notifySortColumns();
		}
	};

	this.removeSortColumn = function(column) {
		if(column.getCaseType() == 1) {
			for(var i = 0; i < _sortColumns.length; i++) {
				if(column.getIndex() == _sortColumns[i].getIndex()) {
					_sortColumns.splice(i, 1);
					break;
				}
			}
			_this.notifySortColumns();
		}
	};

	this.notifySortColumns = function() {
		if(_context.options.onSortColumns) {
			var ret = _context.options.onSortColumns(_sortColumns);
			if(typeof(ret) == 'boolean') {
				_context.options.enabledSortColumn = ret;
			}
		}
	};
}

//表格头列对象
function KuiTableHeadColumn(context, row, index, inst) {
	var _this = this;
	var _context = context;
	var _row = row;
	var _index = index;
	var _inst = inst;

	var _case = $(_inst.children().get(0));
	var _caseType = -1; //列类型，0=默认(只有文字)，1=高级(有排序)，2=checkbox选择列，其它值无效

	var _sortMode = 0; //排序模式，0=没有排序，1=降序，2=升序
	var _sortName = '';

	var _checkbox = null; //如果_caseType=2，并且可多选行，则关联checkbox对象

	//获得列所在索引位
	this.getIndex = function() {
		return _index;
	};

	//显示列
	this.show = function() {
		_inst.show();
	};

	//隐藏列
	this.hide = function() {
		_inst.hide();
	};

	this.getCaseType = function() {
		return _caseType;
	};

	if(_inst.hasClass('checkbox') && _index == 0) {
		_caseType = 2;
	}else if(_case.is('span')) {
		_caseType = 0;
	}else if(_case.is('div')) {
		_caseType = 1;
	}

	if(_caseType < 0 || _caseType > 2) {
		return;
	}

	if(_caseType == 1) {
		_sortName = _inst.data('sort-name');

		this.getSortMode = function() {
			return _sortMode;
		};

		this.getSortName = function() {
			return _sortName;
		};

		this.sortDesc = function() {
			_sortMode = 1;
			_case.removeClass('sort-asc');
			_case.addClass('sort-desc');
			_row.addSortColumn(_this);
		};

		this.sortAsc = function() {
			_sortMode = 2;
			_case.removeClass('sort-desc');
			_case.addClass('sort-asc');
			_row.updateSortColumn(_this);
		};

		this.cancelSort = function(needNotify) {
			_sortMode = 0;
			_case.removeClass('sort-desc');
			_case.removeClass('sort-asc');
			if(needNotify) {
				_row.removeSortColumn(_this);
			}
		};

		_case.unbind();
		_case.click(function() {
			if(_context.options.enabledSortColumn) {
				switch(_sortMode) {
					case 0:
						_this.sortDesc();
						break;
					case 1:
						_this.sortAsc();
						break;
					case 2:
						_this.cancelSort(true);
						break;
				}
			}
		});
	}else if(_caseType == 2) {
		_context.selectRows.enabled = true;

		if(_case.is('label') && _case.hasClass('checkbox')) {
			_context.selectRows.selectMulti = true;

			_checkbox = kui(_case.data('bind'));
			_checkbox.setOptions({
				onChange : function(self, src) {
					if(src == 'user') {
						_context.event.send(_checkbox.isChecked() ? 'rows.select.all' : 'rows.unselect.all');
					}
				}
			});

			this.update = function() {
				_checkbox.setChecked(_context.selectRows.rowFirstColumns.length == _context.rowCount);
			};

			_context.event.register('row.select', _this.update);
			_context.event.register('row.unselect', _this.update);
		}else {
			_context.selectRows.selectMulti = false;
		}
	}
}

//表格头功能行对象
function KuiTableHeadActionRow(context, inst) {
	var _this = this;
	var _context = context;
	var _inst = inst;

	var _checkbox = null;
	var _selectCountCase = $('.select-count', _inst);

	(function() {
		var t = $($('>th:nth-child(1)', _inst).children().get(0));
		if(t.is('label') && t.hasClass('checkbox')) {
			_checkbox = kui(t.data('bind'));
			if(_context.selectRows.selectMulti) {
				_checkbox.show();
				_checkbox.setOptions({
					onChange : function(self, src) {
						if(src == 'user') {
							_context.event.send(_checkbox.isChecked() ? 'rows.select.all' : 'rows.unselect.all');
						}
					}
				});
			}else {
				_checkbox.hide();
			}
		}
	})();

	this.show = function() {
		if(_checkbox) {
			_checkbox.setChecked(_context.selectRows.rowFirstColumns.length == _context.rowCount);
		}

		if(_selectCountCase) {
			_selectCountCase.text(_context.selectRows.rowFirstColumns.length);
		}

		_inst.show();
	};

	this.hide = function() {
		_inst.hide();
	};
}

//表格主体对象
function KuiTableBody(context, inst) {
	var _this = this;
	var _context = context;
	var _inst = inst;

	_context.body = _this;

	var _rows = [];

	(function() {
		var index = 0;
		$('tr', _inst).each(function() {
			var row = new KuiTableBodyRow(_context, index, $(this));
			_rows.push(row);
			index++;
		});
		_context.rowCount = _rows.length;
	})();

	//显示指定列
	this.showColumn = function(index) {
		for(var i = 0; i < _rows.length; i++) {
			_rows[i].showColumn(index);
		}
	};

	//隐藏指定列
	this.hideColumn = function(index) {
		for(var i = 0; i < _rows.length; i++) {
			_rows[i].hideColumn(index);
		}
	};

	//设置表格数据
	this.setData = function(data) {
		_this.clearData();
		if(data && typeof(data.length) == 'number') {
			for(var x = 0; x < data.length; x++) {
				var rowData = data[x];
				var tr = $('<tr></tr>');
				if(rowData && typeof(rowData.length) == 'number') {
					var size = _context.columnCount;
					if(_context.selectRows.enabled) {
						tr.append('<td><label class="checkbox"><span><span><span><svg viewBox="0 0 15 15.343"><path d="M1.013 8.11c0-.223.078-.412.234-.568l1.14-1.14c.155-.155.345-.233.568-.233s.413.077.57.233l2.46 2.47 5.492-5.5c.156-.156.346-.234.568-.234.224 0 .413.077.57.233l1.138 1.14c.156.155.234.345.234.568 0 .224-.078.414-.234.57l-6.06 6.06-1.14 1.14c-.155.155-.345.233-.568.233s-.413-.078-.57-.234l-1.138-1.14-3.03-3.03c-.156-.156-.234-.346-.234-.57z"></path></svg></span></span></span></label></td>');
						size--;
					}
					var y = 0;
					for(; y < rowData.length && y < size; y++) {
						var colData = rowData[y];
						tr.append($('<td>' + (typeof(colData.value) == 'function' ? colData.value() : colData.value) + '</td>'));
					}

					if(y < size) {
						var range = _context.columnCount - y;
						for(var i = 0; i < range; i++) {
							tr.append($('<td></td>'));
						}
					}
				}
				_inst.append(tr);
				initKui(tr);

				var row = new KuiTableBodyRow(_context, x, tr);
				_rows.push(row);
			}
			_context.rowCount = _rows.length;
		}
	};

	//清空表格数据
	this.clearData = function() {
		for(var i = 0; i < _rows.length; i++) {
			_rows[i].remove();
		}
		_rows = [];
		_context.rowCount = 0;
		_context.selectRows.rowFirstColumns = [];
	};
}

//表格主体行对象
function KuiTableBodyRow(context, index, inst) {
	var _this = this;
	var _context = context;
	var _index = index;
	var _inst = inst;

	//获得列所在索引位
	this.getIndex = function() {
		return _index;
	};

	var _columns = [];

	(function() {
		var index = 0;
		$('td', _inst).each(function() {
			var col = new KuiTableBodyColumn(_context, _this, index, $(this));
			_columns.push(col);
			index++;
		});
	})();

	//显示指定列
	this.showColumn = function(index) {
		if(index >= 0 && index < _columns.length) {
			_columns[index].show();
		}
	};

	//隐藏指定列
	this.hideColumn = function(index) {
		if(index >= 0 && index < _columns.length) {
			_columns[index].hide();
		}
	};

	this.remove = function() {
		for(var i = 0; i < _columns.length; i++) {
			_columns[i].remove();
		}
		_inst.remove();
	};
}

//表格主体列对象
function KuiTableBodyColumn(context, row, index, inst) {
	var _this = this;
	var _context = context;
	var _row = row;
	var _index = index;
	var _inst = inst;

	var _checkbox = null; //如果_context.selectRows.enabled=true，则关联checkbox对象

	this.getRow = function() {
		return _row;
	};

	this.getIndex = function() {
		return _index;
	};

	this.show = function() {
		_inst.show();
	};

	this.hide = function() {
		_inst.hide();
	};

	this.remove = function() {
		_inst.remove();
		_context.event.unbind(_this);
	};

	if(_index == 0 && _context.selectRows.enabled) {
		var _case = $(_inst.children().get(0));
		if(_case.is('label') && _case.hasClass('checkbox')) {
			_checkbox = kui(_case.data('bind'));
			_checkbox.setOptions({
				onChange : function() {
					if(_checkbox.isChecked()) {
						if(_context.selectRows.selectMulti) {
							_context.selectRows.rowFirstColumns.push(_this);
						}else {
							if(_context.selectRows.rowFirstColumns.length > 0) {
								for(var i = 0; i < _context.selectRows.rowFirstColumns.length; i++) {
									_context.selectRows.rowFirstColumns[i].unselect();
								}
							}
							_context.selectRows.rowFirstColumns = [_this];
						}
						_context.event.send('row.select');
					}else {
						if(_context.selectRows.selectMulti) {
							if(_context.selectRows.rowFirstColumns.length > 0) {
								for(var i = 0; i < _context.selectRows.rowFirstColumns.length; i++) {
									if(_this.getRow() == _context.selectRows.rowFirstColumns[i].getRow()) {
										_context.selectRows.rowFirstColumns.splice(i, 1);
										break;
									}
								}
							}
						}else {
							_context.selectRows.rowFirstColumns = [];
						}
						_context.event.send('row.unselect');
					}
				}
			});

			_this.unselect = function() {
				_checkbox.setChecked(false);
			};

			_context.event.register('rows.select.all', function() {
				_checkbox.setChecked(true);
			}, _this);

			_context.event.register('rows.unselect.all', function() {
				_checkbox.setChecked(false);
			}, _this);
		}
	}
}

//表格盒子对象
function KuiTableBox(inst) {
	var _this = this;
	var _inst = inst;

	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};
}

//绑定UI，obj是UI对象
function bindKuiObj(obj) {
	var id = obj.id();
	if(typeof(id) != 'undefined') {
		KUI_OBJ_LOOKUP.id[id] = obj;
	}

	var bind = obj.bind();
	if(typeof(bind) != 'undefined') {
		KUI_OBJ_LOOKUP.bind[bind] = obj;
	}
}

//初始化Label下的Checkbox组件
function initClassKuiLabelCheckbox(parent) {
	$('label.checkbox', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiLabelCheckbox($(this)));
	});
}

//初始化顶部导航
function initClassKuiTopnav(parent) {
	$('.kui-topnav', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiTopnav($(this)));
	});
}

//初始化侧边导航栏
function initClassKuiSidenav(parent) {
	$('.kui-sidenav', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiSidenav($(this)));
	});
}

//初始化表格
function initClassKuiTable(parent) {
	$('.kui-table', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiTable($(this)));
	});
}

//初始化表格盒子
function initClassKuiTableBox(parent) {
	$('.kui-table-box', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiTableBox($(this)));
	});
}

//初始化所有UI组件
function initKui(parent) {
	var initHandler = null;
	for(var i = 0; i < KUI_INIT_CLASSES.length; i++) {
		initHandler = KUI_CLASS_INIT_HANDLERS[KUI_INIT_CLASSES[i]];
		if(initHandler) {
			initHandler(parent);
		}
	}
}

//页面加载完成时的首次初始化
$(document).ready(function() {
	initKui();
});