#include <iostream>
#include <stdio.h>
using namespace std;

int main(){

static int z=5;
printf("%d ", z--);
if(z) main( );
return 0;}
