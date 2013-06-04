'''
Created on May 26, 2013

@author: kon
'''

from django.conf.urls import patterns, url

from dataModel import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index')
)