var getStringValueFromDate = function (date) {
  if (!date) {
    return '';
  }

  return moment(date).format("MM/DD/YYYY");
};

Template.mdlDatePicker.onRendered(function () {


  if (this.data.value) {
    this.$('input').data('dateObject', this.data.value);
  }
});

Template.mdlDatePicker.events({
  'change input': function (e, tpl) {
    var $el = $(e.currentTarget);

    if ($el.val()) {
      $el.data('dateObject', $el.datepicker('getDate'));
      tpl.$('label').html('');
    } else {
      $el.data('dateObject', null);
      tpl.$('label').html(getStringValueFromDate(tpl.data.value));
    }
  }
});

Template.mdlDatePicker.helpers({
  'value': function () {
    var tpl = Template.instance();
    return getStringValueFromDate(tpl.data.value || new Date());
  }
});
