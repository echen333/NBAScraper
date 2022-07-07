import matplotlib.pyplot as plt
import csv

from numpy import percentile

def plotChance():
    wins = [0 for i in range(55)]
    tot = [0 for i in range(55)]
    plt.xlabel("Point gap after 3rd Q")
    plt.ylabel("Chance of winning")
    plt.ylim(0,100);

    with open('dataRet.csv','r')as file:
        filecontent=csv.reader(file)
        for row in filecontent:
            if row[4]=="NaN" or row[5]=="NaN":
                continue;
            diff3 = int(row[4])
            diff4 = int(row[5])
            ret = row[6]
            if diff3>50 or abs(diff4)>50:
                continue;
            tot[diff3]+=1
            
            
            if ret == 'true':
                wins[diff3]+=1
    
    for i in range(55):
        if(tot[i]==0):
            continue;
        percentage = 100.0*wins[i]/tot[i]; 
        percentage2 = int(percentage);
        print(i,percentage2);
        plt.plot([i],[percentage2],'xb-');
    
def plotAllPoints():
    plt.xlabel("Point gap before 4th Q")
    plt.ylabel("Point gap after 4th Q")
    with open('dataRet.csv','r')as file:
        filecontent=csv.reader(file)
        for row in filecontent:
            if row[4]=="NaN" or row[5]=="NaN":
                continue;
            diff3 = int(row[4])
            diff4 = int(row[5])
            ret = row[6]
            if diff3>50 or abs(diff4)>50:
                continue;
            
            if(ret == 'true'):
                plt.plot([diff3],[diff4],'ro', markersize=3)
            else :
                plt.plot([diff3],[abs(diff4)],'b+', markersize=3)
    
           
plotChance()
# plotAllPoints()
plt.show()