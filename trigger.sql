create or replace function public.notify_testevent()
   returns trigger
   language plpgsql
   as $functions$
   begin
       perform           pg_notify('new_testevent',row_to_json(NEW)::text);
   return null;
   end;
   
   
   $functions$


create trigger updated_test_trigger 
after
    insert on actor
    for each row 
    execute procedure notify_testevent();
    