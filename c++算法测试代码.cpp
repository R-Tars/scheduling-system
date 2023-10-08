#include <cstring>
#include <iostream>
#include <algorithm>
#include <vector>
#include <queue>
using namespace std;

const int N = 100010;

int n, m;
int h[N], e[N], ne[N], idx;
int d[N];
int q[N];
bool st[N];
vector<int> semester[8];
queue<int> qu;
void add(int a, int b)
{
    e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
}

/*bool topsort()
{
    int hh = 0, tt = -1;

    for (int i = 1; i <= n; i ++ )
        if (!d[i])
            q[ ++ tt] = i;

    while (hh <= tt)
    {
        int t = q[hh ++ ];

        for (int i = h[t]; i != -1; i = ne[i])
        {
            int j = e[i];
            if (-- d[j] == 0)
                q[ ++ tt] = j;
        }
    }

    return tt == n - 1;
}*/

void solve()
{
	bool flag = 1;
	int semester_cnt = 0;
	while(flag)
	{
		flag = 0;
		for (int i = 1 ; i <= n ; i ++ ){
			if (!d[i] && !st[i]){
				st[i] = 1;
				flag = 1;
				qu.push(i);
			}
		}
		while(!qu.empty()){
			int t = qu.front();
			semester[semester_cnt].push_back(t);
			qu.pop();
			for (int i = h[t] ; ~i ; i = ne[i]){
				int j = e[i];
				d[j]--;
			}
		}
		semester_cnt++;
	}
}

int main()
{
    scanf("%d%d", &n, &m);

    memset(h, -1, sizeof h);

    for (int i = 0; i < m; i ++ )
    {
        int a, b;
        scanf("%d%d", &a, &b);
        add(a, b);

        d[b] ++ ;
    }

    /*if (!topsort()) puts("-1");
    else
    {
        for (int i = 0; i < n; i ++ ) printf("%d ", q[i]);
        puts("");
    }*/
    solve();
    for (int i = 0; i < 8 ; i ++ ){
    	for (auto t : semester[i]) cout << t << " ";
    	cout << endl;
    }

    return 0;
}