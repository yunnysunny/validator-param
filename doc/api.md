## Classes

<dl>
<dt><a href="#Validator">Validator</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ValidateElement">ValidateElement</a></dt>
<dd></dd>
<dt><a href="#Schema">Schema</a></dt>
<dd></dd>
</dl>

<a name="Validator"></a>

## Validator
**Kind**: global class  

* [Validator](#Validator)
    * [new Validator()](#new_Validator_new)
    * _instance_
        * [.doValidate(params)](#Validator+doValidate) ⇒ <code>null</code> \| <code>Object</code>
    * _static_
        * [.Validator](#Validator.Validator)
            * [new Validator(schema)](#new_Validator.Validator_new)

<a name="new_Validator_new"></a>

### new Validator()
The class of Validator

<a name="Validator+doValidate"></a>

### validator.doValidate(params) ⇒ <code>null</code> \| <code>Object</code>
To do a validation.

**Kind**: instance method of [<code>Validator</code>](#Validator)  

| Param | Type |
| --- | --- |
| params | <code>Object</code> | 

<a name="Validator.Validator"></a>

### Validator.Validator
**Kind**: static class of [<code>Validator</code>](#Validator)  
<a name="new_Validator.Validator_new"></a>

#### new Validator(schema)
Creates an instance of Validator.


| Param | Type |
| --- | --- |
| schema | [<code>Schema</code>](#Schema) | 

<a name="ValidateElement"></a>

## ValidateElement
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| required | <code>Boolean</code> \| <code>Array</code> | 
| type | <code>Number</code> \| <code>JSON</code> \| <code>Date</code> \| <code>Array</code> | 

<a name="Schema"></a>

## Schema
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| filedName | [<code>ValidateElement</code>](#ValidateElement) | 

**Example**  
```javascript{  numberFiled : {    required:true,    type : Number  }}```
**Example**  
```javascript{ dateField:{     required:[true,'the dateField can not be empty']     type:[Date,'the dataField must be a Date'] }}```
