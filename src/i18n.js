import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/locales/en'

Vue.use(VueI18n)

const cache = ['en'];
const i18n = new VueI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages: { en }
});

function apply(locale) {
	i18n.locale = locale;
	return locale;
}

export function setLocale(locale) {
	if (i18n.locale === locale || cache.includes(locale)) {
		return Promise.resolve(apply(locale));
	}

	return import(/* webpackChunkName: "locale-[request]" */ `@/locales/${locale}`).then(
		messages => {
			i18n.setLocaleMessage(locale, messages.default);
			cache.push(locale);
			return apply(locale);
		}
	)
}

export default i18n;