FROM nginx:stable
RUN rm /etc/nginx/conf.d/default.conf
COPY --chown=nginx:root nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:root dist/out/ /usr/share/nginx/html/

#envsubst to perform the variable substitution on nginx startup
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/root/env.template.js > /usr/share/nginx/html/root/env.js \
    && envsubst < /usr/share/nginx/html/marqueblanche-refonte/env.template.js > /usr/share/nginx/html/marqueblanche-refonte/env.js \
    && exec nginx -g 'daemon off;'"]