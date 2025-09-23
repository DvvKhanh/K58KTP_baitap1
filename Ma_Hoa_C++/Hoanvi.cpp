// columnar.cpp
// Biên dịch: g++ columnar.cpp -o columnar
#include <bits/stdc++.h>
using namespace std;

string remove_spaces(const string &s){
    string t; for(char c:s) if(!isspace((unsigned char)c)) t.push_back(c);
    return t;
}

vector<int> key_order(const string &key){
    int n = key.size();
    vector<pair<char,int>> v;
    for(int i=0;i<n;i++) v.push_back({key[i], i});
    sort(v.begin(), v.end());
    vector<int> rank(n);
    for(int r=0;r<n;r++) rank[v[r].second] = r;
    return rank;
}

string columnar_encrypt(const string &plain, const string &key){
    string txt = remove_spaces(plain);
    int cols = key.size();
    int rows = (txt.size() + cols - 1) / cols;
    vector<string> grid(rows, string(cols, 'X'));
    int p=0;
    for(int r=0;r<rows;r++) for(int c=0;c<cols;c++) {
        if (p < (int)txt.size()) grid[r][c] = txt[p++]; else grid[r][c] = 'X';
    }
    vector<int> rank = key_order(key);
    string out;
    for(int rnk=0;rnk<cols;rnk++){
        for(int c=0;c<cols;c++) if(rank[c]==rnk){
            for(int r=0;r<rows;r++) out.push_back(grid[r][c]);
        }
    }
    return out;
}

string columnar_decrypt(const string &cipher, const string &key){
    int cols = key.size();
    int rows = (cipher.size() + cols -1) / cols;
    vector<int> rank = key_order(key);
    vector<string> grid(rows, string(cols, ' '));
    int p=0;
    for(int rnk=0; rnk<cols; rnk++){
        for(int c=0;c<cols;c++) if(rank[c]==rnk){
            for(int r=0;r<rows;r++){
                if (p < (int)cipher.size()) grid[r][c] = cipher[p++];
            }
        }
    }
    string out;
    for(int r=0;r<rows;r++) for(int c=0;c<cols;c++) out.push_back(grid[r][c]);
    while(!out.empty() && out.back()=='X') out.pop_back();
    return out;
}

int main(){
    string txt,key;
    cout<<"Nhap van ban: "; getline(cin, txt);
    cout<<"Nhap khoa k: "; getline(cin, key);
    string enc = columnar_encrypt(txt, key);
    cout<<"Ma hoa: "<<enc<<"\n";
    cout<<"Giai ma (tu ma hoa): "<<columnar_decrypt(enc, key)<<"\n";
    return 0;
}
