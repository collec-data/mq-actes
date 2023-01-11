FROM httpd:2.4

RUN apt-get update && \
  apt-get install -y libapache2-mod-auth-openidc && \
  cp /usr/lib/apache2/modules/mod_auth_openidc.so /usr/local/apache2/modules && \
  apt-get clean

COPY ./config/my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./config/auth_openidc.conf.template /usr/local/apache2/conf/custom/auth_openidc.conf

RUN ln -s /public/OpenData /usr/local/apache2/htdocs/OpenData
RUN ln -s /private /usr/local/apache2/htdocs/private