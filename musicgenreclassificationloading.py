# -*- coding: utf-8 -*-
"""MusicGenreClassificationLoading.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1Z31k0XggAD7r4sXov8Hxlpd95FEueqRU
"""

# Imports

# load
with open('file', 'rb') as f:
  model = pickle.load(f)

model.predict()