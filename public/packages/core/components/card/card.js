/* eslint no-param-reassign: "off" */
import { getDocument } from 'ssr-window';
import { bindMethods } from '../../shared/utils.js';
import { getSupport } from '../../shared/get-support.js';
import { getDevice } from '../../shared/get-device.js';
import $ from '../../shared/dom7.js';
const CardExpandable = {
  open(cardEl, animate) {
    if (cardEl === void 0) {
      cardEl = '.card-expandable';
    }
    if (animate === void 0) {
      animate = true;
    }
    const app = this;
    const device = getDevice();
    const document = getDocument();
    const support = getSupport();
    const $cardEl = $(cardEl).eq(0);
    if (!$cardEl || !$cardEl.length) return;
    if ($cardEl.hasClass('card-opened') || $cardEl.hasClass('card-opening') || $cardEl.hasClass('card-closing')) return;
    const $pageEl = $cardEl.parents('.page').eq(0);
    if (!$pageEl.length) return;
    if ($pageEl.find('.card-opened').length) {
      return;
    }
    let prevented;
    function prevent() {
      prevented = true;
    }
    $cardEl.trigger('card:beforeopen', {
      prevent
    });
    app.emit('cardBeforeOpen', $cardEl[0], prevent);
    if (prevented) return;
    const cardParams = Object.assign({
      animate
    }, app.params.card, $cardEl.dataset());
    const $pageContentEl = $cardEl.parents('.page-content');
    let $backdropEl;
    if ($cardEl.attr('data-backdrop-el')) {
      $backdropEl = $($cardEl.attr('data-backdrop-el'));
    }
    if (!$backdropEl && cardParams.backdrop) {
      $backdropEl = $pageContentEl.find('.card-backdrop');
      if (!$backdropEl.length) {
        $backdropEl = $('<div class="card-backdrop"></div>');
        $pageContentEl.append($backdropEl);
      }
    }
    let $navbarEl;
    let $toolbarEl;
    if (cardParams.hideNavbarOnOpen) {
      $navbarEl = $pageEl.children('.navbar');
      if (!$navbarEl.length) {
        if ($pageEl[0].f7Page) $navbarEl = $pageEl[0].f7Page.$navbarEl;
      }
    }
    if (cardParams.hideToolbarOnOpen) {
      $toolbarEl = $pageEl.children('.toolbar');
      if (!$toolbarEl.length) {
        $toolbarEl = $pageEl.parents('.view').children('.toolbar');
      }
      if (!$toolbarEl.length) {
        $toolbarEl = $pageEl.parents('.views').children('.toolbar');
      }
    }
    const currTransform = $cardEl.css('transform');
    let hasTransform;
    if (currTransform && currTransform.match(/[2-9]/)) {
      hasTransform = true;
    }
    const $cardContentEl = $cardEl.children('.card-content');
    const $cardSizeEl = $(document.createElement('div')).addClass('card-expandable-size');
    $cardEl.append($cardSizeEl);
    let cardWidth = $cardEl[0].offsetWidth;
    let cardHeight = $cardEl[0].offsetHeight;
    let pageWidth = $pageEl[0].offsetWidth;
    let pageHeight = $pageEl[0].offsetHeight;
    let maxWidth = $cardSizeEl[0].offsetWidth || pageWidth;
    let maxHeight = $cardSizeEl[0].offsetHeight || pageHeight;
    let statusbarHeight;
    if ($navbarEl && !cardParams.hideStatusbarOnOpen && maxHeight === pageHeight) {
      statusbarHeight = parseInt($navbarEl.css('--f7-safe-area-top'), 10);
      if (Number.isNaN(statusbarHeight)) statusbarHeight = 0;
    }
    if (statusbarHeight) {
      maxHeight -= statusbarHeight;
    }
    let scaleX = maxWidth / cardWidth;
    let scaleY = maxHeight / cardHeight;
    let offset = $cardEl.offset();
    let pageOffset = $pageEl.offset();
    if (statusbarHeight) {
      pageOffset.top += statusbarHeight / 2;
    }
    offset.left -= pageOffset.left;
    let cardLeftOffset;
    let cardTopOffset;
    if (hasTransform) {
      const transformValues = currTransform.replace(/matrix\(|\)/g, '').split(',').map(el => el.trim());
      if (transformValues && transformValues.length > 1) {
        const scale = parseFloat(transformValues[0]);
        cardLeftOffset = offset.left - cardWidth * (1 - scale) / 2;
        cardTopOffset = offset.top - pageOffset.top - cardHeight * (1 - scale) / 2;
        if (app.rtl) cardLeftOffset -= $cardEl[0].scrollLeft;
      } else {
        cardLeftOffset = $cardEl[0].offsetLeft;
        cardTopOffset = $cardEl[0].offsetTop - ($pageContentEl.length ? $pageContentEl[0].scrollTop : 0);
      }
    } else {
      cardLeftOffset = offset.left;
      cardTopOffset = offset.top - pageOffset.top;
      if (app.rtl) cardLeftOffset -= $cardEl[0].scrollLeft;
    }
    cardLeftOffset -= (pageWidth - maxWidth) / 2;
    cardTopOffset -= (pageHeight - maxHeight) / 2;
    let cardRightOffset = maxWidth - cardWidth - cardLeftOffset;
    if (app.rtl) {
      [cardLeftOffset, cardRightOffset] = [cardRightOffset, cardLeftOffset];
    }
    let cardBottomOffset = maxHeight - cardHeight - cardTopOffset;
    let translateX = (cardRightOffset - cardLeftOffset) / 2;
    let translateY = (cardBottomOffset - cardTopOffset) / 2;
    if (cardParams.hideNavbarOnOpen && $navbarEl && $navbarEl.length) {
      if ($navbarEl.closest('.navbar-hidden').length) {
        // Was hidden
        $cardEl[0].f7KeepNavbarOnClose = true;
      } else {
        delete $cardEl[0].f7KeepNavbarOnClose;
        app.navbar.hide($navbarEl, cardParams.animate, cardParams.hideStatusbarOnOpen, true);
      }
    }
    if (cardParams.hideToolbarOnOpen && $toolbarEl && $toolbarEl.length) {
      if ($toolbarEl.closest('.toolbar-hidden').length) {
        // Was hidden
        $cardEl[0].f7KeepToolbarOnClose = true;
      } else {
        delete $cardEl[0].f7KeepToolbarOnClose;
        app.toolbar.hide($toolbarEl, cardParams.animate);
      }
    }
    if ($backdropEl) {
      $backdropEl.removeClass('card-backdrop-out').addClass('card-backdrop-in');
    }
    $cardEl.removeClass('card-transitioning');
    if (cardParams.animate) {
      $cardEl.addClass('card-opening');
    }
    $cardEl.trigger('card:open');
    app.emit('cardOpen', $cardEl[0]);
    function transitionEnd() {
      $pageEl.addClass('page-with-card-opened');
      if (device.ios && $pageContentEl.length) {
        $pageContentEl.css('height', `${$pageContentEl[0].offsetHeight + 1}px`);
        setTimeout(() => {
          $pageContentEl.css('height', '');
        });
      }
      $cardEl.addClass('card-opened');
      $cardEl.removeClass('card-opening');
      $cardEl.trigger('card:opened');
      app.emit('cardOpened', $cardEl[0], $pageEl[0]);
    }
    $cardContentEl.css({
      width: `${maxWidth}px`,
      height: `${maxHeight}px`
    }).transform(`translate3d(${app.rtl ? cardLeftOffset + translateX : -cardLeftOffset - translateX}px, 0px, 0) scale(${1 / scaleX}, ${1 / scaleY})`);
    $cardEl.transform(`translate3d(${app.rtl ? -translateX : translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`);
    if (cardParams.animate) {
      $cardEl.transitionEnd(() => {
        transitionEnd();
      });
    } else {
      transitionEnd();
    }
    function onResize() {
      $cardEl.removeClass('card-transitioning');
      cardWidth = $cardEl[0].offsetWidth;
      cardHeight = $cardEl[0].offsetHeight;
      pageWidth = $pageEl[0].offsetWidth;
      pageHeight = $pageEl[0].offsetHeight;
      maxWidth = $cardSizeEl[0].offsetWidth || pageWidth;
      maxHeight = $cardSizeEl[0].offsetHeight || pageHeight;
      statusbarHeight = 0;
      if ($navbarEl && !cardParams.hideStatusbarOnOpen && maxHeight === pageHeight) {
        statusbarHeight = parseInt($navbarEl.css('--f7-safe-area-top'), 10);
        if (Number.isNaN(statusbarHeight)) statusbarHeight = 0;
      }
      if (statusbarHeight) {
        maxHeight -= statusbarHeight;
      }
      scaleX = maxWidth / cardWidth;
      scaleY = maxHeight / cardHeight;
      $cardEl.transform('translate3d(0px, 0px, 0) scale(1)');
      offset = $cardEl.offset();
      pageOffset = $pageEl.offset();
      if (statusbarHeight) {
        pageOffset.top += statusbarHeight / 2;
      }
      offset.left -= pageOffset.left;
      offset.top -= pageOffset.top;
      cardLeftOffset = offset.left - (pageWidth - maxWidth) / 2;
      if (app.rtl) cardLeftOffset -= $cardEl[0].scrollLeft;
      cardTopOffset = offset.top - (pageHeight - maxHeight) / 2;
      cardRightOffset = maxWidth - cardWidth - cardLeftOffset;
      cardBottomOffset = maxHeight - cardHeight - cardTopOffset;
      if (app.rtl) {
        [cardLeftOffset, cardRightOffset] = [cardRightOffset, cardLeftOffset];
      }
      translateX = (cardRightOffset - cardLeftOffset) / 2;
      translateY = (cardBottomOffset - cardTopOffset) / 2;
      $cardEl.transform(`translate3d(${app.rtl ? -translateX : translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`);
      $cardContentEl.css({
        width: `${maxWidth}px`,
        height: `${maxHeight}px`
      }).transform(`translate3d(${app.rtl ? cardLeftOffset + translateX : -cardLeftOffset - translateX}px, 0px, 0) scale(${1 / scaleX}, ${1 / scaleY})`);
    }
    let cardScrollTop;
    let isTouched;
    let isMoved;
    let touchStartX;
    let touchStartY;
    let touchEndX;
    let touchEndY;
    let isScrolling;
    let progress;
    let isV;
    let isH;
    let $cardScrollableEl;
    function onTouchStart(e) {
      if (!$(e.target).closest($cardEl).length) return;
      if (!$cardEl.hasClass('card-opened')) return;
      $cardScrollableEl = $cardEl.find(cardParams.scrollableEl);
      if ($cardScrollableEl[0] && $cardScrollableEl[0] !== $cardContentEl[0] && !$cardScrollableEl[0].contains(e.target)) {
        cardScrollTop = 0;
      } else {
        cardScrollTop = $cardScrollableEl.scrollTop();
      }
      isTouched = true;
      touchStartX = e.targetTouches[0].pageX;
      touchStartY = e.targetTouches[0].pageY;
      isScrolling = undefined;
      isV = false;
      isH = false;
    }
    function onTouchMove(e) {
      if (!isTouched) return;
      touchEndX = e.targetTouches[0].pageX;
      touchEndY = e.targetTouches[0].pageY;
      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(touchEndY - touchStartY) > Math.abs(touchEndX - touchStartX));
      }
      if (!isH && !isV) {
        if (!isScrolling && e.targetTouches[0].clientX <= 50) {
          isH = true;
        } else {
          isV = true;
        }
      }
      if (!(isH || isV) || isV && cardScrollTop !== 0) {
        isTouched = true;
        isMoved = true;
        return;
      }
      if (!isMoved) {
        $cardEl.removeClass('card-transitioning');
      }
      isMoved = true;
      progress = isV ? Math.max((touchEndY - touchStartY) / 150, 0) : Math.max((touchEndX - touchStartX) / (cardWidth / 2), 0);
      if (progress > 0 && isV || isH) {
        if (isV && device.ios && $cardScrollableEl[0] === $cardContentEl[0]) {
          $cardScrollableEl.css('-webkit-overflow-scrolling', 'auto');
          $cardScrollableEl.scrollTop(0);
        }
        e.preventDefault();
      }
      if (progress > 1) progress **= 0.3;
      if (progress > (isV ? 1.3 : 1.1)) {
        isTouched = false;
        isMoved = false;
        app.card.close($cardEl);
      } else {
        $cardEl.transform(`translate3d(${app.rtl ? -translateX : translateX}px, ${translateY}px, 0) scale(${scaleX * (1 - progress * 0.2)}, ${scaleY * (1 - progress * 0.2)})`);
      }
    }
    function onTouchEnd() {
      if (!isTouched || !isMoved) return;
      isTouched = false;
      isMoved = false;
      if (device.ios) {
        $cardScrollableEl.css('-webkit-overflow-scrolling', '');
      }
      if (progress >= 0.8) {
        app.card.close($cardEl);
      } else {
        $cardEl.addClass('card-transitioning').transform(`translate3d(${app.rtl ? -translateX : translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`);
      }
    }
    $cardEl[0].detachEventHandlers = function detachEventHandlers() {
      app.off('resize', onResize);
      if (support.touch && cardParams.swipeToClose) {
        app.off('touchstart:passive', onTouchStart);
        app.off('touchmove:active', onTouchMove);
        app.off('touchend:passive', onTouchEnd);
      }
    };
    app.on('resize', onResize);
    if (support.touch && cardParams.swipeToClose) {
      app.on('touchstart:passive', onTouchStart);
      app.on('touchmove:active', onTouchMove);
      app.on('touchend:passive', onTouchEnd);
    }
  },
  close(cardEl, animate) {
    if (cardEl === void 0) {
      cardEl = '.card-expandable.card-opened';
    }
    if (animate === void 0) {
      animate = true;
    }
    const app = this;
    const device = getDevice();
    const $cardEl = $(cardEl).eq(0);
    if (!$cardEl || !$cardEl.length) return;
    if (!$cardEl.hasClass('card-opened') || $cardEl.hasClass('card-opening') || $cardEl.hasClass('card-closing')) return;
    const $cardContentEl = $cardEl.children('.card-content');
    const $pageContentEl = $cardEl.parents('.page-content');
    const $pageEl = $cardEl.parents('.page').eq(0);
    if (!$pageEl.length) return;
    const cardParams = Object.assign({
      animate
    }, app.params.card, $cardEl.dataset());
    const $cardScrollableEl = $cardEl.find(cardParams.scrollableEl);
    let $navbarEl;
    let $toolbarEl;
    let $backdropEl;
    if ($cardEl.attr('data-backdrop-el')) {
      $backdropEl = $($cardEl.attr('data-backdrop-el'));
    }
    if (cardParams.backdrop) {
      $backdropEl = $cardEl.parents('.page-content').find('.card-backdrop');
    }
    if (cardParams.hideNavbarOnOpen) {
      $navbarEl = $pageEl.children('.navbar');
      if (!$navbarEl.length) {
        if ($pageEl[0].f7Page) $navbarEl = $pageEl[0].f7Page.$navbarEl;
      }
      if ($navbarEl && $navbarEl.length && !$cardEl[0].f7KeepNavbarOnClose) {
        app.navbar.show($navbarEl, cardParams.animate, true);
      }
    }
    if (cardParams.hideToolbarOnOpen) {
      $toolbarEl = $pageEl.children('.toolbar');
      if (!$toolbarEl.length) {
        $toolbarEl = $pageEl.parents('.view').children('.toolbar');
      }
      if (!$toolbarEl.length) {
        $toolbarEl = $pageEl.parents('.views').children('.toolbar');
      }
      if ($toolbarEl && $toolbarEl.length && !$cardEl[0].f7KeepToolbarOnClose) {
        app.toolbar.show($toolbarEl, cardParams.animate);
      }
    }
    $pageEl.removeClass('page-with-card-opened');
    if (device.ios && $pageContentEl.length) {
      $pageContentEl.css('height', `${$pageContentEl[0].offsetHeight + 1}px`);
      setTimeout(() => {
        $pageContentEl.css('height', '');
      });
    }
    if ($backdropEl && $backdropEl.length) {
      $backdropEl.removeClass('card-backdrop-in').addClass('card-backdrop-out');
    }
    $cardEl.removeClass('card-opened card-transitioning');
    if (cardParams.animate) {
      $cardEl.addClass('card-closing');
    } else {
      $cardEl.addClass('card-no-transition');
    }
    $cardEl.transform('');
    $cardEl.trigger('card:close');
    app.emit('cardClose', $cardEl[0], $pageEl[0]);
    const animateWidth = $cardEl.hasClass('card-expandable-animate-width');
    function transitionEnd() {
      if (!animateWidth) {
        $cardContentEl.css({
          width: '',
          height: ''
        });
      }
      if ($backdropEl && $backdropEl.length) {
        $backdropEl.removeClass('card-backdrop-in card-backdrop-out');
      }
      $cardEl.removeClass('card-closing card-no-transition');
      $cardEl.trigger('card:closed');
      $cardEl.find('.card-expandable-size').remove();
      app.emit('cardClosed', $cardEl[0], $pageEl[0]);
    }
    if (animateWidth) {
      $cardContentEl.css({
        width: '',
        height: ''
      });
    }
    $cardContentEl.transform('').scrollTop(0, animate ? 300 : 0);
    if ($cardScrollableEl.length && $cardScrollableEl[0] !== $cardContentEl[0]) {
      $cardScrollableEl.scrollTop(0, animate ? 300 : 0);
    }
    if (animate) {
      $cardContentEl.transitionEnd(() => {
        transitionEnd();
      });
    } else {
      transitionEnd();
    }
    if ($cardEl[0].detachEventHandlers) {
      $cardEl[0].detachEventHandlers();
      delete $cardEl[0].detachEventHandlers;
    }
  },
  toggle(cardEl, animate) {
    if (cardEl === void 0) {
      cardEl = '.card-expandable';
    }
    const app = this;
    const $cardEl = $(cardEl).eq(0);
    if (!$cardEl.length) return;
    if ($cardEl.hasClass('card-opened')) {
      app.card.close($cardEl, animate);
    } else {
      app.card.open($cardEl, animate);
    }
  }
};
export default {
  name: 'card',
  params: {
    card: {
      hideNavbarOnOpen: true,
      hideStatusbarOnOpen: true,
      hideToolbarOnOpen: true,
      scrollableEl: '.card-content',
      swipeToClose: true,
      closeByBackdropClick: true,
      backdrop: true
    }
  },
  create() {
    const app = this;
    bindMethods(app, {
      card: CardExpandable
    });
  },
  on: {
    pageBeforeIn(page) {
      const app = this;
      if (app.params.card.hideNavbarOnOpen && page.navbarEl && page.$el.find('.card-opened.card-expandable').length) {
        app.navbar.hide(page.navbarEl, true, app.params.card.hideStatusbarOnOpen, true);
      }
      if (app.params.card.hideToolbarOnOpen && page.$el.find('.card-opened.card-expandable').length) {
        let $toolbarEl = page.$el.children('.toolbar');
        if (!$toolbarEl.length) {
          $toolbarEl = page.$el.parents('.view').children('.toolbar');
        }
        if (!$toolbarEl.length) {
          $toolbarEl = page.$el.parents('.views').children('.toolbar');
        }
        if ($toolbarEl && $toolbarEl.length) {
          app.toolbar.hide($toolbarEl);
        }
      }
    }
  },
  clicks: {
    '.card-close': function closeCard($clickedEl, data) {
      const app = this;
      app.card.close(data.card, data.animate);
    },
    '.card-open': function closeCard($clickedEl, data) {
      const app = this;
      app.card.open(data.card, data.animate);
    },
    '.card-expandable': function toggleExpandableCard($clickedEl, data, e) {
      const app = this;
      if ($clickedEl.hasClass('card-opened') || $clickedEl.hasClass('card-opening') || $clickedEl.hasClass('card-closing')) return;
      if ($(e.target).closest('.card-prevent-open, .card-close').length) return;
      app.card.open($clickedEl);
    },
    '.card-backdrop-in': function onBackdropClick() {
      const app = this;
      let needToClose = false;
      if (app.params.card.closeByBackdropClick) needToClose = true;
      const $openedCardEl = $('.card-opened');
      if (!$openedCardEl.length) return;
      if ($openedCardEl.attr('data-close-by-backdrop-click') === 'true') {
        needToClose = true;
      } else if ($openedCardEl.attr('data-close-by-backdrop-click') === 'false') {
        needToClose = false;
      }
      if (needToClose) app.card.close($openedCardEl);
    }
  }
};