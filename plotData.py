import matplotlib.pyplot as plt
import csv

with open('dataRet.csv','r')as file:
   filecontent=csv.reader(file)
   for row in filecontent:
       diff3 = int(row[4])
       diff4 = int(row[5])
       ret = row[6]
       print(diff3,diff4, ret)
       if diff3>50 or diff4>50:
           continue;
       
       if(ret == 'true'):
           plt.plot([diff3],[diff4],'ro')
       else :
           plt.plot([diff3],[abs(diff4)],'b+')
           

# plt.plot([1, 2, 3, 4])
# plt.ylabel('some numbers')
plt.show()