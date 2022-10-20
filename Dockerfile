FROM nginx:stable
RUN rm /etc/nginx/conf.d/default.conf
COPY --chown=nginx:root nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:root dist/out/ /usr/share/nginx/html/

#
CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]