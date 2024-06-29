        

        function get_loc(a,b)
        { return ((a-1)*columns)+b; }


        function change_color()
        { event.target.style.backgroundColor = "black"; }

        function clear_screen()
        {
            rand_arr = [];
            if(timeoutID!=0)
            { 
                if(timeoutID.length>0)
                {
                    while(timeoutID.length>0)
                    { 
                        clearTimeout(timeoutID[0]); 
                        timeoutID.shift();
                    }
                    timeoutID =0;
                }
            }

            
            for(i=mid+0;i<=mid+rows;i++)
            { 
                str = get_loc(1,i);
                for(j=1;j<=rows;j++)
                { 
                    color_change(str,"white"); 
                    str = str+columns;
                } 
            }
        }

        function color_change(str,color)
        {
            str = str.toString();
            square = document.getElementById(str);
            square.style.backgroundColor = color; 
        }

        function elemental_swap(num1,num2,a,b)
        {
            let diff , max , min , max_i , min_i;
                
            if(num1>=num2)
            {
                max= num1;
                max_i = a;
                min= num2;
                min_i = b;
            }
            else
            { 
                max = num2;
                max_i = b;
                min = num1;
                min_i = a;
            }

            let str_max = get_loc(1,max_i+mid);
            let str_min = get_loc(1,min_i+mid);
            diff = max-min;
            let start = (rows-max);
            str_max = str_max + (start*columns);
            str_min = str_min + (start*columns);

            for(i=1;i<=diff;i++)
            {
                color_change(str_max,"white");
                color_change(str_min,"blue");

                str_max += columns;
                str_min += columns;
            }
                
        }

        function change_column(i,value,str)
        {
            let loc = get_loc(rows,mid+i);

            for(j=1;j<=rows;j++)
            {
                if(j<=value)
                { color_change(loc,str); }
                else
                { color_change(loc,"white"); }
                loc = loc - columns;
            }
        }
        function color_swap(a,b,num1,num2,str)
        {
            color_column(a,num1,str);
            color_column(b,num2,str);
        }

        function color_column(i,val,str)
        {
            let loc = get_loc(rows,mid+i);

            for(j=1;j<=val;j++)
            {
                color_change(loc,str);
                loc = loc - columns;
            }
        }

        function swap(arr,a,b)
        {
            let temp;
            temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
            return arr;
        }

        function max(a,b)
        {
            if(a>=b)
            { return 0; }
            else
            { return 1; }
        }

    // ---------------------------------------------------- Sorting Algos ---------------------------------------------------------------
    
        function bubble_sort(arr)
        {
            let n = (arr.length) , k , count = 1;
            timeoutID = [];
            for(i=0;i<n-1;i++)
            {
                for(j=0;j<n-i-1;j++)
                {
                    timeoutID.push(setTimeout(color_swap,speed*count,j,j+1,arr[j],arr[j+1],"red"));
                    count++;
                    if(arr[j]>arr[j+1])
                    {       
                        timeoutID.push(setTimeout(color_swap,speed*count,j,j+1,arr[j],arr[j+1],"blue"));
                        count++;                      
                        timeoutID.push(setTimeout(elemental_swap,speed*count,arr[j],arr[j+1],j,j+1));
                        count++;
                        arr = swap(arr,j,j+1);
                        timeoutID.push(setTimeout(color_swap,speed*count,j,j+1,arr[j],arr[j+1],"black"));
                        count++;
                        
                    }
                    else
                    {
                        timeoutID.push(setTimeout(color_swap,speed*count,j,j+1,arr[j],arr[j+1],"black"));
                        count++;
                    }
                        
                }
            }

        }

        function insertion_sort(arr,mid)
        {
            timeoutID = [];
            let n= arr.length,count=1;
            for(i=0;i<n-1;i++)
            {
                timeoutID.push(setTimeout(color_column,speed*count,i+1,arr[i+1],"red"));
                count++;
                temp = arr[i+1];
                for(j=i;j>=0;j--)
                {
                    timeoutID.push(setTimeout(color_column,speed*count,j,arr[j],"red"));
                    count++;
                    if(arr[j]>temp)
                    { 
                        timeoutID.push(setTimeout(change_column,speed*count,j+1,arr[j],"blue"));
                        arr[j+1] = arr[j];
                        count++; 
                        timeoutID.push(setTimeout(color_column,speed*count,j+1,arr[j+1],"black"));
                        count++;
                    }
                    else
                    {
                        timeoutID.push(setTimeout(change_column,speed*count,j+1,temp,"blue"));
                        arr[j+1] = temp; 
                        count++;
                        timeoutID.push(setTimeout(color_column,speed*count,j+1,arr[j+1],"black"));
                        count++;
                        timeoutID.push(setTimeout(color_column,speed*count,j,arr[j],"black"));
                        count++;
                        break;
                    }
                    
                    if(j==0)
                    { 
                        
                        timeoutID.push(setTimeout(change_column,speed*count,0,temp,"blue"));
                        count++;
                        arr[0] = temp; 
                        timeoutID.push(setTimeout(color_column,speed*count,0,arr[0],"black"));
                        count++;
                        break;
                    }
                    else
                    {
                        timeoutID.push(setTimeout(color_column,speed*count,j,arr[j],"black"));
                        count++;
                    }
                    
                    
                }
                timeoutID.push(setTimeout(color_column,speed*count,i+1,arr[i+1],"black"));
                count++;
            }
        }

        function selection_sort(arr)
        {
            let n,min,count=1;
            n = arr.length;
            timeoutID= [];

            for(i=0;i<n-1;i++)
            {
                min = i;
                timeoutID.push(setTimeout(color_column,speed*count,i,arr[i],"red"));
                count++;
                for(j=i+1;j<n;j++)
                {
                    timeoutID.push(setTimeout(color_column,speed*count,j,arr[j],"red"));
                    count++;
                    if(arr[j]<arr[min])
                    {  
                        timeoutID.push(setTimeout(color_column,speed*count,min,arr[min],"black"));
                        count++;
                        min = j;
                        timeoutID.push(setTimeout(color_column,speed*count,min,arr[min],"red"));
                        count++;
                    }
                    else
                    {
                        timeoutID.push(setTimeout(color_column,speed*count,j,arr[j],"black"));
                        count++;
                    }
                }
                timeoutID.push(setTimeout(color_column,speed*count,min,arr[min],"black"));
                count++;
                if(min!=i)
                { 
                    timeoutID.push(setTimeout(color_swap,speed*count,i,min,arr[i],arr[min],"blue"));
                    count++;
                    timeoutID.push(setTimeout(elemental_swap,speed*count,arr[i],arr[min],i,min));
                    arr = swap(arr,i,min);
                    count++;
                    timeoutID.push(setTimeout(color_swap,speed*count,i,min,arr[i],arr[min],"black"));
                    count++;
                }
            }
        }

        function quick_sort(arr,start,size,count)
        {
            if(size>1)
            {
                let pivot;
                pivot = arr[start];
                timeoutID.push(setTimeout(color_column,speed*count,start,arr[start],"orange"));
                count++;
                for(i=start,j= start+size-1 ; j>i ; )
                {
                    do{
                        i++;
                    }while( arr[i]<pivot && i<(start+size) );

                    while(arr[j]>pivot && j>=start)
                    { j--; }

                    if(j>i)
                    { 
                        timeoutID.push(setTimeout(color_swap,speed*count,i,j,arr[i],arr[j],"blue"));
                        count++;
                        timeoutID.push(setTimeout(elemental_swap,speed*count,arr[i],arr[j],i,j));
                        arr = swap(arr,i,j);
                        count++;
                        timeoutID.push(setTimeout(color_swap,speed*count,i,j,arr[i],arr[j],"black"));
                        count++;
                    }
                }

                timeoutID.push(setTimeout(color_swap,speed*count,start,j,arr[start],arr[j],"blue"));
                count++;
                timeoutID.push(setTimeout(elemental_swap,speed*count,arr[start],arr[j],start,j));
                arr = swap(arr,start,j);
                count++;
                timeoutID.push(setTimeout(color_swap,speed*count,start,j,arr[start],arr[j],"black"));
                count++;

                
                if(i!=j)
                {
                    temp = quick_sort(arr,start,j+1-start,count);
                    arr = temp.a;
                    count = temp.cnt;
                    temp = quick_sort(arr, j+1 , size-j-1+start,count);
                    arr = temp.a;
                    count = temp.cnt;
                }
                else
                {
                    temp = quick_sort(arr,start,j-start,count);
                    arr = temp.a;
                    count = temp.cnt;
                    temp = quick_sort(arr, j , size-j-start,count);
                    arr = temp.a;
                    count = temp.cnt;
                }
            }

            let obj = {
                a: arr,
                cnt: count
            }
            return obj;
        }

        // -------------------------- Heap Sort --------------------------
        function parent(num)
        {
            if(num==0)
            { return -1; }

            if(num%2 == 0)
            { num = num-2; }
            else
            { num = num-1; }

            return (num/2);
        }

        function make_heap(arr,count)
        {
            let new_arr = [] , i , temp,par,child;
            new_arr.push(arr[0]);
            timeoutID = [];
            for(i=1;i<arr.length;i++)
            {
                child = i;
                new_arr.push(arr[i]);
                par = parent(i);

                while(par>=0)
                {
                    if(new_arr[child]<=new_arr[par])
                    { break; }
                    else
                    { 
                        timeoutID.push(setTimeout(color_swap,speed*count,child,par,new_arr[child],new_arr[par],"blue"));
                        count++;
                        timeoutID.push(setTimeout(elemental_swap,speed*count,new_arr[child],new_arr[par],child,par));
                        count++;
                        new_arr = swap(new_arr,child,par);
                        timeoutID.push(setTimeout(color_swap,speed*count,child,par,new_arr[child],new_arr[par],"black"));
                        count++;
                        child = par;
                        par = parent(par);
                    }
                }
            }

            let obj ={
                a: new_arr,
                cnt: count
            }
            return obj;
        }

        function heap_sort(arr,count,timeoutID)
        {
            let size = arr.length , par , left , right;
            //timeoutID = [];
            while(size>1)
            {
                timeoutID.push(setTimeout(color_swap,speed*count,0,size-1,arr[0],arr[size-1],"blue"));
                count++;
                timeoutID.push(setTimeout(elemental_swap,speed*count,arr[0],arr[size-1],0,size-1));
                arr = swap(arr,0,size-1);
                count++;
                timeoutID.push(setTimeout(color_swap,speed*count,0,size-1,arr[0],arr[size-1],"black"));
                count++;
                size--;
                par = 0;

                while(par<=(size-1))
                {
                    left = (2*par)+1;
                    right = (2*par)+2;

                    if(left>size-1)
                    { break; }

                    if(right<=(size-1))
                    {
                        if(max(arr[left],arr[right])==0)
                        { 
                            if(arr[left]<=arr[par])
                            { break; }
                            else
                            {
                                timeoutID.push(setTimeout(color_swap,speed*count,par,left,arr[par],arr[left],"blue"));
                                count++;
                                timeoutID.push(setTimeout(elemental_swap,speed*count,arr[par],arr[left],par,left));
                                count++;
                                arr = swap(arr,par,left);
                                timeoutID.push(setTimeout(color_swap,speed*count,par,left,arr[par],arr[left],"black"));
                                count++;
                                par = left;
                            }
                        }
                        else
                        {
                            if(arr[right]<=arr[par])
                            { break; }
                            else
                            {
                                timeoutID.push(setTimeout(color_swap,speed*count,par,right,arr[par],arr[right],"blue"));
                                count++;
                                timeoutID.push(setTimeout(elemental_swap,speed*count,arr[par],arr[right],par,right));
                                count++;
                                arr = swap(arr,par,right);
                                timeoutID.push(setTimeout(color_swap,speed*count,par,right,arr[par],arr[right],"black"));
                                count++;
                                par = right;
                            }
                        }
                    }
                    else
                    {
                        if(arr[left]<=arr[par])
                        { break; }
                        else
                        {
                            timeoutID.push(setTimeout(color_swap,speed*count,par,left,arr[par],arr[left],"blue"));
                            count++;
                            timeoutID.push(setTimeout(elemental_swap,speed*count,arr[par],arr[left],par,left));
                            arr = swap(arr,par,left);
                            count++;
                            timeoutID.push(setTimeout(color_swap,speed*count,par,left,arr[par],arr[left],"black"));
                            count++;
                            break;
                        }
                    }
                }
            }
        }

        // ----------------------- Merge Sort -----------------------

        function merge(arr,low,middle,high,count,mid)
        {            
            for(j= middle+1 ; j<=high ; j++)
            {
                // timeoutID.push(setTimeout(color_column,speed*count,j,arr[j],"red"));
                // count++;
                temp = arr[j];
                for(i= j-1 ; i>=low ; i--)
                {
                    // timeoutID.push(setTimeout(color_column,speed*count,i,arr[i],"red"));
                    // count++;
                    if(arr[i]>temp)
                    { 
                        timeoutID.push(setTimeout(change_column,speed*count,i+1,arr[i],"blue"));
                        count++;
                        arr[i+1] = arr[i];
                        timeoutID.push(setTimeout(color_column,speed*count,i+1,arr[i+1],"black"));
                        count++; 
                    }
                    else
                    {
                        timeoutID.push(setTimeout(change_column,speed*count,i+1,temp,"blue"));
                        count++;
                        arr[i+1] = temp;
                        timeoutID.push(setTimeout(color_column,speed*count,i+1,arr[i+1],"black"));
                        count++;
                        // timeoutID.push(setTimeout(color_column,speed*count,i,arr[i],"black"));
                        // count++;
                        break;
                    }

                    if(i==low)
                    { 
                        timeoutID.push(setTimeout(change_column,speed*count,i,temp,"blue"));
                        count++;
                        arr[i] = temp;
                        timeoutID.push(setTimeout(color_column,speed*count,i,arr[i],"black"));
                        count++; 
                    }
                    // else
                    // {
                    //     timeoutID.push(setTimeout(color_column,speed*count,i,arr[i],"black"));
                    //     count++;
                    // }
                }
                // timeoutID.push(setTimeout(color_column,speed*count,j,arr[j],"black"));
                // count++;
            }
            
            temp = {
                array: arr,
                cnt: count
            }
            return temp;
        }

        function merge_sort(arr,low,high,count)
        {
            let middle;

            if(low<high)
            {
                middle = Math.floor((low+high)/2);
                temp = merge_sort(arr,low,middle,count);
                arr = temp.array;
                count = temp.cnt;
                temp = merge_sort(arr,middle+1,high,count);
                arr = temp.array;
                count = temp.cnt;
                temp = merge(arr,low,middle,high,count);
                arr = temp.array;
                count = temp.cnt;
            }

            temp = {
                array: arr,
                cnt: count
            }
            return temp;
        }

    // ---------------------------------------------------------- End of sorting algos -------------------------------------------------

        function generate_array()
        {
            
            if(timeoutID.length>0)
            { alert("Let the sorting finish first or you can press clear screen in order to stop the sorting."); }
            else
            {
                clear_screen();
                let arr = [] , random_item , index;
                for(i=1;i<=rows;i++)
                { arr.push(i); }

                for(i=0;i<rows;i++)
                {
                    index = Math.floor(Math.random()*arr.length);
                    if(index>-1)
                    {
                        random_item = arr[index];
                        rand_arr.push(random_item);
                        arr.splice(index, 1);
                    }

                }

                let id , num ,mid = Math.floor((columns-rows)/2)+1;
                console.log("Array length: ",rand_arr.length,"\n");

                for(i=0;i<rand_arr.length;i++)
                {
                    num = get_loc(rows,i+mid);

                    for(j=1;j<=rand_arr[i];j++)
                    {
                        color_change(num,"black");
                        num = num - columns;
                    }
                }
                    
                return rand_arr;
            }
        }

        function start_sort()
        {
            
            let mid = Math.floor((columns-rand_arr.length)/2)+1;
            if(rand_arr.length!=rows)
            { alert("Please generate an array first"); }
            else
            {
                // if(sorted)
                if(timeoutID.length>0)
                { alert("Let the sorting finish first or you can press clear screen in order to stop the sorting."); }
                else
                {
                    square= document.getElementById("vel");
                    str = square.options[square.selectedIndex].value;

                    if(str=="SF")
                    { speed = 2; }
                    else if(str=="F")
                    { speed = 20; }
                    else if(str=="M")
                    { speed = 50; }
                    else if(str=="SL")
                    { speed = 85; }
                    else 
                    { speed = 150; }


                    square= document.getElementById("opt");
                    str = square.options[square.selectedIndex].value;

                    if(str=="bubble")
                    { bubble_sort(rand_arr); }
                    else if(str=="insertion")
                    { insertion_sort(rand_arr); }
                    else if(str=="selection")
                    { selection_sort(rand_arr); }
                    else if(str=="quick")
                    { 
                        timeoutID = [];
                        quick_sort(rand_arr,0,rand_arr.length,1); 
                    }
                    else if(str=="merge")
                    { 
                        timeoutID= [];
                        merge_sort(rand_arr,0,rand_arr.length-1,1); 
                    }
                    else if(str=="heap")
                    {
                        temp = make_heap(rand_arr,1);
                        heap_sort(temp.a,temp.cnt,timeoutID);
                    }
                }
            }
            
        }