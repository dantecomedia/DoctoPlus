import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder

import keras
from keras.models import Sequential
from keras.layers import Dense
from keras.utils import np_utils
from keras.utils.np_utils import to_categorical
from keras.wrappers.scikit_learn import KerasClassifier
from keras.models import model_from_json
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import KFold



file = open("Symptoms.csv", 'r')
data = file.read()
symptoms = data.split(',')


DataFrame=pd.read_excel("final.xlsx")

cols = DataFrame.columns[:-1]
X = DataFrame[cols] 
Y = DataFrame.iloc[:,404]
Z=Y



LabelEn = LabelEncoder()
LabelEn.fit_transform(Y)
Y = LabelEn.transform(Y)


raw = np.zeros(len(cols))


for i in range(len(cols)) :
  for j in range(len(symptoms)):
    if cols[i] == symptoms[j].rstrip():
      raw[i] = 1

raw = raw.reshape(-1,1)

raw = raw.T


dummy_y=np_utils.to_categorical(Y)



json_file = open('model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)
loaded_model.load_weights("model.h5")


loaded_model.compile(
  loss='categorical_crossentropy',
  optimizer='adagrad',
  metrics=['accuracy']
) 

#loaded_model.fit(X,dummy_y,batch_size=10,nb_epoch=200 )



y_pred = loaded_model.predict(raw)

predicted = np.argmax(y_pred, axis=1)
predicted = LabelEn.inverse_transform(predicted)
# print(predicted)


def compute(y_pred):
    zv=sum(list(y_pred))
    zz=sum(list(y_pred))
    pr=zz.argsort()[-3:][::-1]
    f=open("PD.txt","w")
    z=""
    c=0
    for j in pr:
        c=c+float(zv[j])
    for i in pr:
        y=LabelEn.inverse_transform([i])
        pk=(float(zv[i])/c)*100
        z=z+str(y[0])+","+str(pk)+","
    f.write(z)
    f.close()
    print(z)

compute(y_pred)



